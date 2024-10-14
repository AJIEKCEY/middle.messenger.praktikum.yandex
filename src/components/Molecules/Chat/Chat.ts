import Component from "../../../core/Component/component.ts";
import template from "./chat.tpl.ts"
import "./chat.css"

export default class Chat extends Component{

  override render(): void {
    this.compile(template, this._props);
  }
}
