import {ComponentC} from "../types.ts";

export default class Route {

  protected _pathname: string;
  protected _block: ComponentC;

  constructor(pathname: string, block: ComponentC) {
    this._pathname = pathname;
    this._block = block;
  }

  get(pathname: string, params:string|undefined) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      if (this._block){
        return this.getBlockInstance(params)
      }
    }

    return null
  }

  getBlockInstance( params?:string) {
    return new this._block(this.prepareParams(params))
  }

  prepareParams(params?:string):{[key: string]: unknown} {
    let properties:{[key: string]: unknown} = {}
    if (params){
      const searchParams = new URLSearchParams(params)
      properties = Object.fromEntries([...searchParams]);
    }

    return properties
  }

  match(pathname:string) {
    return this.isEqual(pathname, this._pathname);
  }

  isEqual = (pathname:string, currPathname:string) => {
    return pathname === currPathname;
  }
}
