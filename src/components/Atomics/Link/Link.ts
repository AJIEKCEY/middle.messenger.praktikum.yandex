import Component from "../../../core/Component/component.ts";
import template from "./link.tpl.ts";

import "./link.css"

export default class Link extends Component{
  override render() {
    this.compile(template, this._props);
  }
}
