import Component from "../../../core/Component/component.ts";
import template from "./chats.tpl.ts"

import "./chats.css"


export default class ChatList extends Component{

  override render(): void {
    this.compile(template, this._props);
  }
}
