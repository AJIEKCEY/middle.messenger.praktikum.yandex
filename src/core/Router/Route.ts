import {ComponentC} from "../types.ts";

const isEqual = (pathname:string, currPathname:string) => {
  return pathname === currPathname;
}

export default class Route {

  protected _pathname: string;
  protected _block: ComponentC;
  public isPublicRoot: Boolean;

  constructor(pathname: string, block: ComponentC, isPublicRoot: boolean) {
    this._pathname = pathname;
    this._block = block;
    this.isPublicRoot = isPublicRoot
  }

  get(pathname: string, params:string|undefined) {
    if (params){
      if (this.match(pathname)) {
        this._pathname = pathname;
        if (this._block){
            const searchParams = new URLSearchParams(params)
            const properties = Object.fromEntries([...searchParams]);
            return new this._block({...properties})
        }
      }
    } else {
      if (this.match(pathname)) {
        this._pathname = pathname;
        if (this._block){
          return new this._block({})
        }
      }
    }

    return null
  }

  match(pathname:string) {
    return isEqual(pathname, this._pathname);
  }
}
