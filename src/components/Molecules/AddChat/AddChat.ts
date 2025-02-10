import "./addChat.css"
import Component from "../../../core/Component/component.ts";
import template from "./addChat.tpl.ts";
import Input from "../../Atomics/Input/Input.ts";
import Button from "../../Atomics/Button/Button.ts";
import addChatApi from "./addChatApi.ts";

const addChatInput = new Input({
  attr: {
    class: 'chats_add__input',
  },
});

const addChatButton = new Button({
  text: 'Добавить',
  events: {
    click: (e: Event) => {
      e.preventDefault();
      const chatName = (e.target as HTMLElement)?.closest('form')?.querySelector<HTMLInputElement>('.chats_add__input')?.value;
      if (!chatName) return
      addChatApi(chatName)
        .then(XHRResponse => {
          console.log(XHRResponse.responseText)
        })
        .catch(e => {
          console.log(e);
        })
    },
  },
  attr: {
    class: 'chats_add__btn',
  },
});

export default class AddChat extends Component{
  constructor() {
    super({
      AddChatInput: addChatInput,
      AddChatButton: addChatButton,
    });
  }

  render() {
    this.compile(template, this._props);
  }
}
