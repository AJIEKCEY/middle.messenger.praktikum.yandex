import Component from "../../../core/Component/component.ts";
import template from "./chats.tpl.ts"

import "./chats.css"
import Router from "../../../core/Router/Router.ts";
//@ts-ignore
import Store from "../../../core/Store/index.js"
import {ComponentProps} from "../../../core/types.ts";
import Chat from "../../Molecules/Chat/Chat.ts";
import chatListApi from "./chatListApi.ts";

const router = new Router()

export default class ChatList extends Component{
  protected _chatList:ComponentProps[] = [];
  constructor() {
    super({
      attr: {
        class: 'left-block'
      },
    });

    //@ts-expect-error    надо разобраться с CustomEvent
    document.addEventListener('searchInputChange', (evt: CustomEvent) => {
      console.log('searchInputChange emited')
      this.setProps({chats: this.filteredChats(evt.detail)})
    })

    this.getChatList()
  }

  getChatList = () => {
    chatListApi()
      .then( XHRResponse => {
        if (XHRResponse.status === 200) {
          console.log(JSON.parse(XHRResponse.responseText))
          this._chatList = JSON.parse(XHRResponse.responseText)
          const chats = this._chatList.map((chatProps: ComponentProps) => {
            return this.getNewChatComponent(chatProps);
          })
          this.setProps({chats})
        } else if (XHRResponse.status === 401){
          router.go('/sign-in');
        } else {
          console.error(XHRResponse.responseText)
        }
      })
      .catch( e => {
        console.log(e)
      })
  }


  clearSelectedChatUi = () => {
    document.querySelector('li.chat__item_active')?.classList.remove('chat__item_active');
  }

  setCurrentChatActiveUi = (chatId:string) => {
    document.querySelector(`li.chat__item[data-chat-id="${chatId}"]`)?.classList.add('chat__item_active');
  }

  getNewChatComponent = (chatProps:ComponentProps) => new Chat({
    ...chatProps,
    events: {
      click : (e: Event) => {
        e.stopPropagation();
        const currentTarget = <HTMLLIElement>e.currentTarget;
        const chatId = currentTarget.dataset.chatId;
        const chatName = (currentTarget.querySelector(".chat__info > h4"))?.innerHTML
        this.clearSelectedChatUi();
        if (chatId){
          this.setCurrentChatActiveUi(chatId)
          // Интересный момент. Если нижние 2 строки поменять местами, то обработчик на изменение chatId отработает
          // раньше, чем установится значение chatName, которое как раз используется в этом обработчике.
          Store.dispatch('setChatName', chatName)
          Store.dispatch('setChatId', chatId)
        }
      },
    },
  })

  filteredChats = (substring: string) => {
    const chats:object[] = [];

    if (this._chatList.length > 0){
      this._chatList.map( (chatProps:ComponentProps) => {
        const chatName = chatProps.title
        if (typeof chatName === 'string' && chatName.toLowerCase().includes(substring.toLowerCase())){
          chats.push(this.getNewChatComponent(chatProps)) ;
        }
      })
    }
    return chats;
  }

  override render(): void {
    this.compile(template, this._props);
  }
}
