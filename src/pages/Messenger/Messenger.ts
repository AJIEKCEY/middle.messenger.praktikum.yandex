import Component from "../../core/Component/component.ts";
import template from "./messenger.tpl.ts"
import Discussion from "../../components/Organisms/Discussion/Discussion.ts";
import Chats from '../../components/Organisms/Chats/Chats.ts';
//@ts-ignore
import Store from "../../core/Store/index.js";

import './messenger.css'

export default class Messenger extends Component{
  constructor() {
    super({
      Chats : new Chats(),
      Discussion : new Discussion()
    });
  }

  override render(): void {
    this.compile(template, this._props);
  }
}
