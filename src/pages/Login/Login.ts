import Component from "../../core/Component/component.ts";
import template from "./login.tpl.ts";

import "./login.css"

export default class Login extends Component{
  override render() {
    this.compile(template, this._props);
  }
}
