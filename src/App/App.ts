import '../utils/helpers/handlebarsHelpers';
import Component from "../core/Component/component.ts";
import template from "./app.tpl.ts"


import './app.css';

export default class App extends Component{

  override render(): void {
    this.compile(template, this._props);
  }
}
