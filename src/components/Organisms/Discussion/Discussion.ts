import Component from "../../../core/Component/component.ts";
//import Input from "../../Atomics/Input/Input.ts";
//import Button from "../../Atomics/Button/Button.ts";
import Message from "../../Molecules/Message/Message.ts";
import Avatar from "../Avatar/Avatar.ts";
import Socket from "../../../core/Socket.ts";
import Conversation from "../Conversation/Conversation.ts";
import Store from "../../../core/Store";
import {ComponentProps} from "../../../core/types.ts";
import template from "./discussion.tpl.ts";
import "./discussion.css"
import Form from "../../Molecules/Form/Form.ts";
import FormControl from "../../Molecules/FormControl/FormControl.ts";
import {SEND_MESSAGES_FORM} from "../../../utils/formsDescription.ts";


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

export default class Discussion extends Component<ComponentProps>{
  private _form = new Form();
  protected _socket;
  protected _messages: Record<number, MessageT[]> = {};
  protected _userId: number = 0;
  protected _chatId: number = 0;
  protected _Conversation!:Conversation;

  constructor(data?:ComponentProps){
    super(data)

    if (Store?.events) {
      Store.events.on('chatId', this.updateComponent.bind(this));
    }
    this._socket = new Socket();
    document.addEventListener('WSOpen', this.getMessages.bind(this))

  }

  openWSConnection(){
    this._chatId = this._store.state.chatId as number;
    this._userId = this._store.state.userId as number;
    if(this._chatId && this._userId)
      this._socket.connect(this._chatId, this._userId);
  }

  updateComponent(){
    this._Conversation = new Conversation({attr: {class: 'conversation'}});
    const chatName =  this._store.state.chatName;
    this.setProps({
      avatar: new Avatar({attr:{class:'avatar'}}),
      SendMessageForm: this.getMessageForm(),
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
    this._socket.obtain((event: MessageEvent) => {

      const messages = JSON.parse(event.data);
      if (Array.isArray(messages)) {
        this._messages[+this._chatId] = messages;
      } else {
        this._messages[+this._chatId].push(messages);
      }
      const messagesList = this._messages[this._chatId].map(( message:MessageT ) =>
        new Message({
          ...message,
          isMyMessage : this._userId === message.user_id
        })
      );

      this._Conversation.setProps({
        messages: messagesList
      })

      console.log(JSON.parse(event.data))
    });
  }

  private onSubmitForm(e: Event){
    e.preventDefault();
    e.stopPropagation();
    const input = document.getElementById('conversation_message') as HTMLInputElement
    const message = input.value.trim()
    if (message.length > 0) {
      input.value = ''
      this._socket.send({
        content: message,
        type: 'message',
      });
    }
  }

  private generateFormControls(formFields: { [key: string]: Record<string, unknown> }) {
    return Object.keys(formFields).map(
      (field) => new FormControl({ ...formFields[field]})
    );
  }

  private setFormProps() {
    const controls = this.generateFormControls(SEND_MESSAGES_FORM);
    this._form.setProps({
      controls,
      events: {
        submit: this.onSubmitForm.bind(this),
      }
    });
  }

  getMessageForm(){
    this.setFormProps();
    return this._form;
  }

  override render(): void{
    this.compile(template, this._props);
  }
}
