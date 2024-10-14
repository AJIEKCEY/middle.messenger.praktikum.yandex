import Component from "../../core/Component/component.ts";
import template from "./settings.tpl.ts";

import "./settings.css"

export default class Settings extends Component{
  override render() {
    this.compile(template, this._props);
  }
}
