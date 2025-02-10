import Component from "../../../core/Component/component.ts";
import template from "./chat.tpl.ts"
import "./chat.css"
import {ComponentProps} from "../../../core/types.ts";
import Avatar from "../../Organisms/Avatar/Avatar.ts";

export default class Chat extends Component{
  constructor(data?:ComponentProps) {
    super({
      ...data,
      avatar: new Avatar({attr:{class:'avatar'}}),
    });
  }


  override render(): void {
    this.compile(template, this._props);
  }
}
