import Component from "../core/Component/component.ts";
import template from "./app.tpl.ts"

import HTTPTransport from "../core/api.ts";
import Store from "../core/Store";

import './app.css';

export default class App extends Component{
  private constructor() {
    super();
  }

  static async initialize(){
    const httpTransport = new HTTPTransport();

    const response = await httpTransport.get('https://ya-praktikum.tech/api/v2/auth/user', {})

    const userId = JSON.parse(response.responseText)?.id;
    Store.dispatch('setUserId', userId)


    return new App()
  }

  override render(): void {
    this.compile(template, this._props);
  }
}
