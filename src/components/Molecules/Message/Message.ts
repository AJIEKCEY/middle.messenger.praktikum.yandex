import "./message.css"
import Component from "../../../core/Component/component.ts";
import template from "./message.tpl.ts";

class Message extends Component{
  render() {
    this.compile(template, this._props);
  }
}

export default Message
