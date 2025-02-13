import "./addChat.css"
import Component from "../../../core/Component/component.ts";
import template from "./addChat.tpl.ts";
import addChatApi from "./addChatApi.ts";
import {ComponentProps} from "../../../core/types.ts";
import FormControl from "../FormControl/FormControl.ts";
import {ADD_CHAT_FORM} from "../../../utils/formsDescription.ts";
import Form from "../Form/Form.ts";

export default class AddChat extends Component<ComponentProps>{
  private _form = new Form();
  constructor() {
    super();

    this.updateComponent()
  }

  updateComponent(){
    this.setProps({
      AddChatForm: this.getAddChatForm(),
    })
  }

  private onSubmitForm(e: Event){
    e.preventDefault();
    e.stopPropagation();
    const addChatEl = (e.target as HTMLElement)?.closest('form')?.querySelector<HTMLInputElement>('#chats__addChat');
    if (addChatEl && addChatEl.value ){
      addChatApi(addChatEl.value)
        .then(XHRResponse => {
          console.log(XHRResponse.responseText)
          addChatEl.value = '';
        })
        .catch(e => {
          console.log(e);
        })
    }
  }

  private generateFormControls(formFields: { [key: string]: Record<string, unknown> }) {
    return Object.keys(formFields).map(
      (field) => new FormControl({ ...formFields[field]})
    );
  }

  private setFormProps() {
    const controls = this.generateFormControls(ADD_CHAT_FORM);
    this._form.setProps({
      controls,
      events: {
        submit: this.onSubmitForm.bind(this),
      }
    });
  }

  getAddChatForm(){
    this.setFormProps();
    return this._form;
  }

  render() {
    this.compile(template, this._props);
  }
}
