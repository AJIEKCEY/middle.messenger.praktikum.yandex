import Login from "./Login.ts";
import Link from "../../components/Atomics/Link";
import Form from "../../components/Molecules/Form";
import FormControl from "../../components/Molecules/FormControl";
import Registration from "../Registration";
import {AUTHORIZATION_FORM} from "../../utils/formsDescription.ts"

export default (prop = {}) => {

  const controls = [];

  for (let field in AUTHORIZATION_FORM){
    // @ts-ignore
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
        window.app.setProps({currentPage: Registration()})
      },
    }
  })

  return new Login({
    ...prop,
    LoginForm:logInForm,
    RegistrationLink: registrationLink,
  })
}
