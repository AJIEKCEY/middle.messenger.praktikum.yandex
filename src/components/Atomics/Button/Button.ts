import Component from "../../../core/Component/component.ts";
import template from "./button.tpl.ts";


export default class Button extends Component{

  override render() {
    this.compile(template(), this._props);
  }
}
