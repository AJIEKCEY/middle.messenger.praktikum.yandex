import Component from "../../../core/Component/component.ts";
import template from "./button.tpl.ts";
import {ComponentProps, Methods} from "../../../core/types.ts";


export default class Button extends Component{
  protected _events?:Methods;

  constructor(data?:ComponentProps) {
    super(data);

    if (data && 'events' in data){
      this._events = data.events as Methods;

      if (typeof this._events === "object") {
        for (const handler in this._events){
          if (typeof this._events[handler] === 'function'){
            this._events[handler] = this._events[handler].bind(this);
          }
        }
      }

      this.setProps({events: this._events})
    }
  }

  override render() {
    this.compile(template(), this._props);
  }
}
