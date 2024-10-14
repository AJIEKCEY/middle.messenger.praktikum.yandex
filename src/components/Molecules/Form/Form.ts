import Component from "../../../core/Component/component.ts";
import template from "./form.tpl.ts";

class Form extends Component{
  render() {
    this.compile(template, this._props);
  }
}

export default Form
