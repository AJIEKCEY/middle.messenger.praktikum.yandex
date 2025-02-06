import Component from "../../core/Component/component.ts";
import template from "./login.tpl.ts";

import "./login.css"
import Link from "../../components/Atomics/Link";
import Router from "../../core/Router/Router.ts";
import {AUTHORIZATION_FORM} from "../../utils/formsDescription.ts";
import {serialize} from "../../utils/baseUtil.ts";
import loginApi from "./loginApi.ts";
import FormControl from "../../components/Molecules/FormControl";
import Form from "../../components/Molecules/Form";


const router = new Router()

const controls = [];

for (const field in AUTHORIZATION_FORM){

  if (field === 'loginBtn' && AUTHORIZATION_FORM[field].hasOwnProperty('events')){
    AUTHORIZATION_FORM[field].events = {
      click: async function (e: Event) {
        e.preventDefault();
        e.stopPropagation();

        // @ts-ignore
        const formEl = e.target?.form;
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
  controls.push(FormControl({...AUTHORIZATION_FORM[field] }));
}

const logInForm = Form({
  controls
});

const registrationLink = Link({
  title: 'Регистрация',
  href: 'javascript:void(0);',
  events: {
    click: (e:Event) => {
      e.stopPropagation();
      router.go('/sign-up');
    },
  }
})

export default class Login extends Component{
  constructor() {
    super({
      LoginForm:logInForm,
      RegistrationLink: registrationLink,
    });
  }


  override render() {
    this.compile(template, this._props);
  }
}
