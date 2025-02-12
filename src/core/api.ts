import Router from "./Router/Router.ts";
import Store from "./Store";

const router = new Router()

type HttpHeaders = {[key: string]: string}

type Options = {
  method: string;
  data?: unknown;
  headers?: HttpHeaders
};

enum METHOD {
  GET = 'GET',
  POST =  'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

// Тип Omit принимает два аргумента: первый — тип, второй — строка
// и удаляет из первого типа ключ, переданный вторым аргументом
type OptionsWithoutMethod = Omit<Options, 'method'>;
// Этот тип эквивалентен следующему:
// type OptionsWithoutMethod = { data?: any };

export default class HTTPTransport {
  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this._request(url, {...options, method: METHOD.GET});
  }

  post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this._request(url, {...options, method: METHOD.POST});
  }

  put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this._request(url, {...options, method: METHOD.PUT});
  }

  patch(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this._request(url, {...options, method: METHOD.PATCH});
  }

  delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this._request(url, {...options, method: METHOD.DELETE});
  }

  protected _request(url: string, options: Options): Promise<XMLHttpRequest> {
    const {method, data, headers} = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.withCredentials = true;
      this._setHeaders(xhr, headers);

      xhr.onload = function() {
        if (xhr.readyState === 4 && xhr.status === 401) {
          Store.dispatch('setIsAuthenticated', false)
          router.go('/sign-in');
        }
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method == 'GET' || !data ){
        xhr.send();
      } else if (method == 'PUT'){
        xhr.send(data as Document | XMLHttpRequestBodyInit | null);
      } else {
        xhr.send(JSON.stringify(data));
      }
    })
  }

  private _setHeaders (xhr: XMLHttpRequest, headers: HttpHeaders | undefined): void {

    if (!headers){
      xhr.setRequestHeader('content-type', 'application/json');
      return
    }

    for (const header in headers){
      xhr.setRequestHeader(header,headers[header]);
    }
  }
}
