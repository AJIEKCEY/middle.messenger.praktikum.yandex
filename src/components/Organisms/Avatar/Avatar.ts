import Component from "../../../core/Component/component.ts";
import template from "./avatar.tpl.ts";
import "./avatar.css"

export default class Avatar extends Component{

  override render() {
    this.compile(template, this._props);
  }
}
