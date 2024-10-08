import "./formControl.css"
import Component from "../../../core/Component/component.ts";
import template from "./formControl.tpl.ts";

class FormControl extends Component{
  render() {
    this.compile(template, this._props);
  }
}

export default FormControl
