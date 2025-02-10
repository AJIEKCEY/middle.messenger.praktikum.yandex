import Component from "../../../core/Component/component.ts";
import template from "./form.tpl.ts";
import {ComponentProps} from "../../../core/types.ts";

export default class Form extends Component{
  constructor(data?:ComponentProps) {
    super(data);
  }

  render() {
    this.compile(template, this._props);
  }
}
