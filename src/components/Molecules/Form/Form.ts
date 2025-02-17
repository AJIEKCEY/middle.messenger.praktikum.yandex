import Component from "../../../core/Component/component.ts";
import template from "./form.tpl.ts";
import {ComponentProps} from "../../../core/types.ts";

export default class Form extends Component<ComponentProps>{
  constructor(data?:ComponentProps) {
    super(data);
  }

  override render(): void {
    this.compile(template, this._props);
  }
}
