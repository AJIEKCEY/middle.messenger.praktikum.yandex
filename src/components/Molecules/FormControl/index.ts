import FormControl from "./FormControl.ts";
import Input from "../../Atomics/Input";

export default (props = {}) => {

  // if (props.hasOwnProperty('tag')){
  //   if (props.tag === 'input'){
  //     const formElement =
  //   }
  // }

  return new FormControl(
    {
      FormElement: Input({
        ...props,
      }),
      ...props,
    }
  )
}
