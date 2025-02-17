import Component from "../../../core/Component/component.ts";
import template from "./link.tpl.ts";
import {ComponentProps} from "../../../core/types.ts";

export default class Link extends Component<ComponentProps>{
  constructor(data?:ComponentProps) {
    super(data);
  }

  override render() {
    this.compile(template, this._props);
  }
}
