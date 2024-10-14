import Component from "../../../core/Component/component.ts";
import template from "./input.tpl.ts";

export default class Input extends Component{
  override render() {
    this.compile(template, this._props);
  }
}
