import Component from "../../../core/Component/component.ts";
import template from "./discussion.tpl.ts";
import "./discussion.css"
//import {ComponentDataType, ComponentProps} from "../../../core/types.ts";
import Input from "../../Atomics/Input";
import Message from "../../Molecules/Message/Message.ts";
import Avatar from "../Avatar";
import Socket from "../../../core/Socket.ts";
import Conversation from "../Conversation/Conversation.ts";

interface MessageT {
  chat_id: number,
  content: string,
  file : string | null,
  id: number,
  is_read: boolean,
  time: Date,
  type: string,
  user_id: number
}

export default class Discussion extends Component{
  protected _socket;
  protected _messages: Record<number, MessageT[]> = {};
  protected _userId: number = 0;
  protected _chatId: number = 0;
  protected _Conversation!:Conversation;

  constructor(){
    super()

    this._store.events.on('chatId',this.updateComponent.bind(this));
    this._socket = new Socket();
    document.addEventListener('WSOpen', this.getMessages.bind(this))
  }

  getInputComponent(){
    return Input({
      id: 'messageInput',
      type: 'text',
      name: 'messageInput',
      events: {
        keyup: (e:KeyboardEvent) => {
          const message = (e.target as HTMLInputElement)?.value.trim()
          if (e.key === 'Enter') {
            this._socket.send({
                content: message,
                type: 'message',
              });
          }
        }
      }
    })
  }

  openWSConnection(){
    this._chatId = this._store.state.chatId;
    this._userId = this._store.state.userId;
    if(this._chatId && this._userId)
      this._socket.connect(this._chatId, this._userId);
  }

  updateComponent(){
    this._Conversation = new Conversation();
    const chatName =  this._store.state.chatName;
    this.setProps({
      avatar: Avatar(),
      DiscussionInput: this.getInputComponent(),
      chatName: chatName,
      Conversation: this._Conversation
    })

    this.openWSConnection();
  }

  getMessages(){
    this._socket.send({
      content: '0',
      type: 'get old',
    });
    this._socket.obtain((event:any) => {

      const messages = JSON.parse(event.data);
      if (!this._messages[this._chatId]) {
        this._messages[+this._chatId] = messages;
      } else {
        this._messages[this._chatId].push(messages);
      }
      const messagesList = this._messages[this._chatId].map(( message:MessageT ) =>
        new Message({
          ...message,
          //isMyMessage : CURRENT_USER_ID === messageProps.user
        })
      );

      this._Conversation.setProps({
        messages: messagesList
      })

      console.log(JSON.parse(event.data))
    });
  }

  render(){
    this.compile(template, this._props);
  }
}
