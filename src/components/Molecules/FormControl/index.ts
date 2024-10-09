import FormControl from "./FormControl.ts";
import Input from "../../Atomics/Input";
import Button from "../../Atomics/Button";
import {ComponentProps} from "../../../core/types.ts";

export default (props:ComponentProps = {}) => {

  let formElement;

  if (props.hasOwnProperty('tag')){
    if (props.tag === 'input'){
      formElement = Input({...props})
    } else if (props.tag === 'button'){
      formElement = Button({...props})
    }
  }

  return new FormControl(
    {
      FormElement: formElement,
      ...props,
    }
  )
}
