import Component from "../../../core/Component/component.ts";
import template from "./avatar.tpl.ts";
import "./avatar.css"
import {ComponentProps} from "../../../core/types.ts";

export default class Avatar extends Component{
  constructor(data?:ComponentProps) {
    super(data)
  }

  override render():void {
    this.compile(template, this._props);
  }
}
