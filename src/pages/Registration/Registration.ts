import Component from "../../core/Component/component.ts";
import template from "./registration.tpl.ts";

import "./registration.css"


export default class Registration extends Component{
  override render() {
    this.compile(template, this._props);
  }
}
