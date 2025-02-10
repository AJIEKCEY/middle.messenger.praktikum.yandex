import "./formControl.css"
import Component from "../../../core/Component/component.ts";
import template from "./formControl.tpl.ts";
import {ComponentProps} from "../../../core/types.ts";
import Input from "../../Atomics/Input/Input.ts";
import Button from "../../Atomics/Button/Button.ts";

export default class FormControl extends Component{
  constructor(data?:ComponentProps) {
    let formElement;

    if (data && Object.hasOwn(data,'tag')){
      if (data.tag === 'input'){
        formElement = new Input({...data})
      } else if (data.tag === 'button'){
        formElement = new Button({...data})
      }
    }


    super({
      ...data,
      FormElement: formElement,
    });
  }

  override render(): void {
    this.compile(template, this._props);
  }
}
