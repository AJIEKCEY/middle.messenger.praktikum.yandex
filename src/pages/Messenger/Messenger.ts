import Component from "../../core/Component/component.ts";
import template from "./messenger.tpl.ts"

import './messenger.css'

export default class Messenger extends Component{

  override render(): void {
    this.compile(template, this._props);
  }
}
