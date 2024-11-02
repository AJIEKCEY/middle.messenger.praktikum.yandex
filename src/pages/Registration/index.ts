import Router from "../../core/Router.ts";
import Registration from "./Registration.ts";
import Link from "../../components/Atomics/Link";
import Form from "../../components/Molecules/Form";
import FormControl from "../../components/Molecules/FormControl";
import {REGISTRATION_FORM} from "../../utils/formsDescription.ts";
import registrationApi from "./registrationApi.ts";
import {serialize} from "../../utils/baseUtil.ts";

const router = new Router()

const controls = [];

for (const field in REGISTRATION_FORM){
  if (field === 'registrationBtn' && REGISTRATION_FORM[field].hasOwnProperty('events')){
    REGISTRATION_FORM[field].events = {
      click: async function (e: Event) {
        e.preventDefault();
        e.stopPropagation();


        // @ts-ignore
        const formEl = (e.target as HTMLElement | null)?.form;
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
                router.go('/Login');
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

  controls.push(FormControl({...REGISTRATION_FORM[field] }));
}

const registrationForm = Form({
  controls
});

const authorizationLink = Link({
  title: 'Войти',
  href: 'javascript:void(0);',
  events: {
    click: (e:Event) => {
      e.stopPropagation();
      router.go('/Login');
    },
  }
})

export default new Registration({
  RegistrationForm:registrationForm,
  AuthorizationLink: authorizationLink,
})
