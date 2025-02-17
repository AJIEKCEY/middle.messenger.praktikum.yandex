import Component from "../../../core/Component/component.ts";
import template from "./chats.tpl.ts"

import "./chats.css"
import Router from "../../../core/Router/Router.ts";
import Button from "../../Atomics/Button/Button.ts";
import SearchBar from "../../Molecules/SearchBar/SearchBar.ts";
import AddChat from "../../Molecules/AddChat/AddChat";
import ChatList from "../ChatList/ChatList.ts";
import {ComponentProps} from "../../../core/types.ts";

const router = new Router();

const settingsButton = new Button({
  events: {
    click: (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      router.go("/links")
    },
  },
  attr: {
    class: 'commands_item',
  },
})


export default class Chats extends Component<ComponentProps>{
  constructor() {
    super({
      SearchBar: new SearchBar(),
      Settings: settingsButton,
      ChatList: new ChatList(),
      AddChat: new AddChat(),
      attr: {
        class: 'chats__wrapper'
      },
    });
  }

  override render(): void {
    this.compile(template, this._props);
  }
}
