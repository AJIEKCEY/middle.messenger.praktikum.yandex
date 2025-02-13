import "./manageChatUsers.css"
import Component from "../../../core/Component/component.ts";
import template from "./manageChatUsers.tpl.ts";
import ManageChatUsersApi from "./manageChatUsersApi.ts";
import {ComponentProps} from "../../../core/types.ts";
import FormControl from "../FormControl/FormControl.ts";
import {MANAGE_CHAT_USERS_FORM} from "../../../utils/formsDescription.ts";
import Form from "../Form/Form.ts";

export default class ManageChatUsers extends Component<ComponentProps>{
  private _form = new Form();
  private manageChatUsersApi: ManageChatUsersApi;
  constructor() {
    super();

    this.updateComponent()
    this.manageChatUsersApi = new ManageChatUsersApi();
  }

  updateComponent(){
    this.setProps({
      ChatManageUsersForm: this.getChatManageUsersForm(),
    })
  }

  private onSubmitForm(e: Event){
    e.preventDefault();
    e.stopPropagation();
    const form: HTMLFormElement = e.target as HTMLFormElement
    const inputEl = form.querySelector<HTMLInputElement>('input');
    if (inputEl && inputEl.value.length > 0 ){
      const userIds = inputEl.value.split(",").map(Number);
      const action = form.dataset.action;

      if (action === "add"){
        this.manageChatUsersApi.addUsers(userIds)
          .then((res) => {
            if (res.response === 'OK') inputEl.value = '';
          });
      } else if (action === "delete") {
        this.manageChatUsersApi.deleteUsers(userIds)
          .then((res) => {
            if (res.response === 'OK') inputEl.value = '';
          });
      } else {
        return
      }
    }
  }

  private generateFormControls(formFields: { [key: string]: Record<string, unknown> }) {
    return Object.keys(formFields).map(
      (field) => new FormControl({ ...formFields[field]})
    );
  }

  private setFormProps() {
    const controls = this.generateFormControls(MANAGE_CHAT_USERS_FORM);
    this._form.setProps({
      controls,
      events: {
        submit: this.onSubmitForm.bind(this),
      }
    });
  }

  getChatManageUsersForm(){
    this.setFormProps();
    return this._form;
  }

  render() {
    this.compile(template, this._props);
  }
}
