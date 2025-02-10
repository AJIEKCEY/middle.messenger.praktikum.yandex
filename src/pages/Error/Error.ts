import Component from "../../core/Component/component.ts";
import template from "../Error/error.tpl.ts";
import Link from "../../components/Atomics/Link/Link.ts";
import Router from "../../core/Router/Router.ts";

import "./error.css"

const router = new Router()

export default class Error extends Component{
  constructor(data:any) {
    super({
      ...data,
      Back : new Link({
        title: 'Назад',
        href: 'javascript:void(0);',
        events: {
          click: (e:Event) => {
            e.preventDefault();
            router.back();
          },
        },
      })
    });
  }

  override render() {
    this.compile(template, this._props);
  }
}
