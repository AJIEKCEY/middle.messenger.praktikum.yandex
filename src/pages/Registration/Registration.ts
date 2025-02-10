import Component from "../../core/Component/component.ts";
import template from "./registration.tpl.ts";

import "./registration.css"
import Router from "../../core/Router/Router.ts";
import {REGISTRATION_FORM} from "../../utils/formsDescription.ts";
import {serialize} from "../../utils/baseUtil.ts";
import registrationApi from "./registrationApi.ts";
import FormControl from "../../components/Molecules/FormControl/FormControl.ts";
import Form from "../../components/Molecules/Form/Form.ts";
import Link from "../../components/Atomics/Link/Link.ts";


const router = new Router()

const controls = [];

for (const field in REGISTRATION_FORM){

  if (field === 'registrationBtn' && REGISTRATION_FORM[field].hasOwnProperty('events')){
    REGISTRATION_FORM[field].events = {
      click: async function (e: Event) {
        e.preventDefault();
        e.stopPropagation();

        const formEl = (e.target as HTMLInputElement | null)?.form;
        if (!formEl) throw new Error('Form element dose not found!')
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

          registrationApi(data)
            .then( XHRResponse => {
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

  controls.push(new FormControl({...REGISTRATION_FORM[field] }));
}

const registrationForm = new Form({
  controls
});

const authorizationLink = new Link({
  title: 'Войти',
  href: 'javascript:void(0);',
  events: {
    click: (e:Event) => {
      e.stopPropagation();
      router.go('/sign-in');
    },
  }
})

export default class Registration extends Component{
  constructor() {
    super({
      RegistrationForm:registrationForm,
      AuthorizationLink: authorizationLink,
    });
  }

  override render() {
    this.compile(template, this._props);
  }
}
