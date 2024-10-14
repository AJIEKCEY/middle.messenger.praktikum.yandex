import Component from "../../../core/Component/component.ts";
import template from "./discussion.tpl.ts";
import "./discussion.css"

export default class Discussion extends Component{

  render(){
    this.compile(template, this._props);
  }
}
