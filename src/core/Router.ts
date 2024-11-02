import Component from "./Component/component.ts";

const isEqual = (pathname:string, currPathname:string) => {
  return pathname === currPathname;
}

class Route {

  protected _pathname: string;
  protected _block: Component;

  constructor(pathname: string, block: Component) {
    this._pathname = pathname;
    this._block = block;
  }

  get(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      if (this._block){
        return this._block
      }
    }
    return null
  }

  match(pathname:string) {
    return isEqual(pathname, this._pathname);
  }
}

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

  use(pathname: string, block: Component) {
    const route = new Route(pathname, block);

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

  _onRoute(pathname:string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    this._currentRoute = route;

    (<Component>this._rootComponent).setProps({currentPage: route.get(pathname)});
  }

  go(pathname:string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
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
}
