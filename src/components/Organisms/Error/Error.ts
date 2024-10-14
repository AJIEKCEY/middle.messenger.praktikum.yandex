import Component from "../../../core/Component/component.ts";
import template from "./error.tpl.ts";

import "./error.css"

export default class App extends Component{

  override render(): void {
    this.compile(template, this._props);
  }
}
