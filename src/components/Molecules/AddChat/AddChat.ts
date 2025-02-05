import "./addChat.css"
import Component from "../../../core/Component/component.ts";
import template from "./addChat.tpl.ts";
import Input from "../../Atomics/Input";
import Button from "../../Atomics/Button";
import addChatApi from "./addChatApi.ts";

const addChatInput = Input({
  attr: {
    class: 'chats_add__input',
  },
});

const addChatButton = Button({
  text: 'Добавить',
  events: {
    click: (e: Event) => {
      e.preventDefault();
      //@ts-ignore
      const chatName = e.target?.form.querySelector('.chats_add__input').value;
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
