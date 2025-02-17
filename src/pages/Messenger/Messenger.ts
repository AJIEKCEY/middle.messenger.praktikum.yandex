import Component from "../../core/Component/component.ts";
import template from "./messenger.tpl.ts"
import Discussion from "../../components/Organisms/Discussion/Discussion.ts";
import Chats from '../../components/Organisms/Chats/Chats.ts';

import './messenger.css'
import {ComponentProps} from "../../core/types.ts";

export default class Messenger extends Component<ComponentProps>{
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
