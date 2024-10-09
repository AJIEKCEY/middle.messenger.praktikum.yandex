import Registration from "./Registration.ts";
import Link from "../../components/Atomics/Link";
import Form from "../../components/Molecules/Form";
import FormControl from "../../components/Molecules/FormControl";
import Login from "../Login";
import {REGISTRATION_FORM} from "../../utils/formsDescription.ts";

export default (prop = {}) => {

  const controls = [];

  for (let field in REGISTRATION_FORM){
    // @ts-ignore
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
        window.app.setProps({currentPage: Login()})
      },
    }
  })

  return new Registration({
    ...prop,
    RegistrationForm:registrationForm,
    AuthorizationLink: authorizationLink,
  })
}
