import Component from "../../core/Component/component.ts";
import template from "./profile.tpl.ts";

import "./profile.css"

export default class Profile extends Component{

  override render(): void {
    this.compile(template, this._props);
  }
}
