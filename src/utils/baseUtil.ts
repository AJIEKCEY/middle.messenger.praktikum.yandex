type Indexed<T = any> = {
  [k in (string | symbol)]: T;
};

type PlainObject<T = any> = {
  [k in string]: T;
};

type StringIndexed = Record<string, any>;

function serialize (data:FormData) {
  const obj:{[key:string]:any} = {};

  for (const [key, value] of data) {
    if (obj[key] !== undefined) {
      if (!Array.isArray(obj[key])) {
        obj[key] = [obj[key]];
      }
      obj[key].push(value);
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

function trim(string: string, chars?: string): string {
  if (string && !chars) {
    return string.trim();
  }

  const reg = new RegExp(`[${chars}]`, "gi");
  return string.replace(reg, "");
}

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    if (!Object.prototype.hasOwnProperty.call(rhs, p)){
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (error) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
    [key]: acc,
  }), value as any);
  return merge(object as Indexed, result);
}

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

function isEqual(lhs: PlainObject, rhs: PlainObject) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

function cloneDeep<T extends Indexed>(obj: T) {
  return (function _cloneDeep(item: T): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
    // Handle:
    // * null
    // * undefined
    // * boolean
    // * number
    // * string
    // * symbol
    // * function
    if (item === null || typeof item !== "object") {
      return item;
    }

    // Handle:
    // * Date
    if (item instanceof Date) {
      return new Date((item as Date).valueOf());
    }

    // Handle:
    // * Array
    if (item instanceof Array) {
      const copy: ReturnType<typeof _cloneDeep>[] = [];

      item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));

      return copy;
    }

    // Handle:
    // * Set
    if (item instanceof Set) {
      const copy = new Set();

      item.forEach(v => copy.add(_cloneDeep(v)));

      return copy;
    }

    // Handle:
    // * Map
    if (item instanceof Map) {
      const copy = new Map();

      item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

      return copy;
    }

    // Handle:
    // * Object
    if (item instanceof Object) {
      const copy: Indexed = {};

      // Handle:
      // * Object.symbol
      Object.getOwnPropertySymbols(item).forEach(s => (copy[s.toString()] = _cloneDeep(item[s.toString()])));

      // Handle:
      // * Object.name (other)
      Object.keys(item).forEach(k => (copy[k] = _cloneDeep(item[k])));

      return copy;
    }

    throw new Error(`Unable to copy object: ${item}`);
  })(obj);
}


/**
 * queryStringify(obj); // 'key=1&key2=test&key3=false&key4=true&key5[0]=1&key5[1]=2&key5[2]=3&key6[a]=1&key7[b][d]=2'
 * @param data
 */
function queryStringify(data: StringIndexed): string | never {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    const value = data[key];
    const endLine = index < keys.length - 1 ? "&" : "";

    if (Array.isArray(value)) {
      const arrayValue = value.reduce<StringIndexed>(
        (result, arrData, index) => ({
          ...result,
          [`${key}[${index}]`]: arrData
        }),
        {}
      );

      return `${result}${queryStringify(arrayValue)}${endLine}`;
    }

    if (typeof value === "object") {
      const objValue = Object.keys(value || {}).reduce<StringIndexed>(
        (result, objKey) => ({
          ...result,
          [`${key}[${objKey}]`]: value[objKey]
        }),
        {}
      );

      return `${result}${queryStringify(objValue)}${endLine}`;
    }

    return `${result}${key}=${value}${endLine}`;
  }, "");
}

function getCookie(name:string) {
  const cookieArr = document.cookie.split(";");

  for(let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split("=");

    if(name == cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }

  return null;
}


export {
  serialize,
  trim,
  merge,
  set,
  isEqual,
  cloneDeep,
  queryStringify,
  getCookie,
}
