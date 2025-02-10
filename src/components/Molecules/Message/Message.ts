import "./message.css"
import Component from "../../../core/Component/component.ts";
import template from "./message.tpl.ts";
import {ComponentProps} from "../../../core/types.ts";

export default class Message extends Component{
  constructor(data?: ComponentProps) {
    if (data && data.time){
      const time:string = data.time as string
      try {
        const timeObj:Date = new Date(time);
        const dateStr = timeObj.toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });

        const timeStr = timeObj.toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })

        data.time = `${dateStr} ${timeStr}`
      } catch (e) {
        console.error(e);
      }
    }

    super(data);

  }

  render() {
    this.compile(template, this._props);
  }
}
