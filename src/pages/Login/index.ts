import Login from "./Login.ts";
import Form from "../../components/Molecules/Form";
import FormControl from "../../components/Molecules/FormControl";
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

  return new Login({
    ...prop,
    LoginForm:logInForm,

  })
}
