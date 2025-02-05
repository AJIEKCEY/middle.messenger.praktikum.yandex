import Component from "../../../core/Component/component.ts";
import template from "./conversation.tpl.ts";
import "./conversation.css";


export default class Conversation extends Component{
  constructor() {
    super();
  }

  render(){
    this.compile(template, this._props);
  }
};
