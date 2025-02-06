import Component from "../Component/component.ts";
import {ComponentC} from "../types.ts";
import Route from "./Route.ts";
//@ts-ignore
import Store from "../Store/index.js";

export default class Router {

  private static __instance: Router;

  protected routes: Route[] | undefined;
  protected history: any;
  protected _currentRoute: unknown;
  protected _rootComponent: unknown;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootComponent = null;

    Router.__instance = this;
  }

  use(pathname: string, block: ComponentC, isPublicRoot = false) {
    const route = new Route(pathname, block, isPublicRoot);

    this.routes?.push(route);

    return this;
  }

  start(rootComponent: Component) {
    if (rootComponent === undefined){
      throw new Error('Root component is undefined!');
    }

    this._rootComponent = rootComponent;

    window.onpopstate = ((event:Event) => {
      this._onRoute((event.currentTarget as Window)?.location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname:string, params: string|undefined = undefined) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    this._currentRoute = route;

    (<Component>this._rootComponent).setProps({currentPage: route.get(pathname, params)});
  }

  go(pathname:string) {
    const {path, params} = this.parsePathName(pathname)
    this.history.pushState({}, '', path);
    this._onRoute(path, params);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname:string) {
    return this.routes?.find(route => route.match(pathname));
  }

  parsePathName(pathname:string){
    let path;
    let params = undefined;

    const searchParamsDivider = pathname.indexOf('?');
    if (searchParamsDivider > 0){
      path = pathname.slice(0,searchParamsDivider);
      params = pathname.slice(searchParamsDivider);
    } else {
      path = pathname;
    }
    return {path, params}
  }
}
