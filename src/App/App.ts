import Component from "../core/Component/component.ts";
import template from "./app.tpl.ts"

import HTTPTransport from "../core/api.ts";
import Store from "../core/Store";

import './app.css';
import {ComponentProps} from "../core/types.ts";
import {BASE_URL_HTTP_API} from "../core/consts.ts";

export default class App extends Component<ComponentProps>{
  private constructor() {
    super();
  }

  static async initialize(){
    const httpTransport = new HTTPTransport();

    const response = await httpTransport.get(`${BASE_URL_HTTP_API}/auth/user`, {})

    const userId = JSON.parse(response.responseText)?.id;
    Store.dispatch('setUserId', userId)

    return new App()
  }

  override render(): void {
    this.compile(template, this._props);
  }
}
