import Component from "../Component/component.ts";
import {ComponentC} from "../types.ts";
import Route from "./Route.ts";


export default class Router {

  private static __instance: Router;

  protected routes: Route[] | undefined;
  protected history: History = window.history;
  protected _currentRoute: unknown;
  protected _rootComponent: Component<Record<string, unknown>> | null = null;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this._currentRoute = null;

    Router.__instance = this;
  }

  use(pathname: string, block: ComponentC) {
    const route = new Route(pathname, block);

    this.routes?.push(route);

    return this;
  }

  start(rootComponent: Component<Record<string, unknown>>) {
    if (rootComponent === undefined){
      throw new Error('Root component is undefined!');
    }

    this._rootComponent = rootComponent;

    window.onpopstate = ((event:Event) => {
      this._onRoute((event.currentTarget as Window)?.location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string, queryParams?: string): void {
    const route = this.getRoute(pathname);
    if (!route) return;

   const currentPage = route.get(pathname, queryParams);
   this._currentRoute = route;
   if (this._rootComponent){
     this._rootComponent.setProps({ currentPage }); // Use extracted variable
   }

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
