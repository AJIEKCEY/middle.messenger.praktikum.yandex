import Component from "../../core/Component/component.ts";
import template from "./login.tpl.ts";

import "./login.css"
import Link from "../../components/Atomics/Link/Link.ts";
import Router from "../../core/Router/Router.ts";
import {AUTHORIZATION_FORM} from "../../utils/formsDescription.ts";
import {serialize} from "../../utils/baseUtil.ts";
import loginApi from "./loginApi.ts";
import FormControl from "../../components/Molecules/FormControl/FormControl.ts";
import Form from "../../components/Molecules/Form/Form.ts";
import {ComponentProps} from "../../core/types.ts";
import Store from "../../core/Store";


const router = new Router()

const controls = [];

const LOGIN_BUTTON_FIELD = 'loginBtn';

for (const field in AUTHORIZATION_FORM){

  if (field === LOGIN_BUTTON_FIELD && 'events' in AUTHORIZATION_FORM[field]){
    AUTHORIZATION_FORM[field].events = {
      click: async function (e: Event) {
        e.preventDefault();
        e.stopPropagation();

        const formEl = (e.target as HTMLInputElement)?.form;
        if (!formEl) throw new Error('Form element dose not found')
        const formElements = formEl.querySelectorAll('input');
        let valid = true;
        formElements.forEach((element: HTMLInputElement) => {
          if (element.value.length === 0)
            element.classList.add('warning');
          if (element.classList.contains('warning')) {
            valid = false
          }
        })

        if (valid) {
          const formData = new FormData(formEl)
          const data = serialize(formData);

          loginApi(data)
            .then(XHRResponse => {
              if (XHRResponse.status === 200){
                router.go('/messenger');
              } else {
                const errorEl = document.querySelector('.error__message');
                if (errorEl){
                  errorEl.innerHTML = JSON.parse(XHRResponse.responseText)?.reason;
                }
                console.error(XHRResponse.responseText)
              }
            })
        }
      }
    }
  }
  controls.push( new FormControl({...AUTHORIZATION_FORM[field] }));
}

const logInForm = new Form({
  controls
});

const registrationLink = new Link({
  title: 'Регистрация',
  href: 'javascript:void(0);',
  events: {
    click: (e:Event) => {
      e.stopPropagation();
      router.go('/sign-up');
    },
  }
})

export default class Login extends Component<ComponentProps>{
  constructor() {
    super({
      LoginForm:logInForm,
      RegistrationLink: registrationLink,
    });

    setTimeout(()=>{
      if(Store.state.isAuthenticated){
        router.go('/messenger');
      } else {
        this.removeAttribute('hidden')
      }
    },0)
  }

  override render() {
    this.compile(template, this._props);
  }
}
