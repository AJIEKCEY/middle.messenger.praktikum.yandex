import Component from "../../../core/Component/component.ts";
import template from "./link.tpl.ts";

export default class Link extends Component{
  override render() {
    this.compile(template, this._props);
  }
}
