import Error from "./Error.ts"
import Link from "../../Atomics/Link";
import Router from "../../../core/Router.ts";

const router = new Router()

export default (prop = {}) => {
  return new Error({
    ...prop,
    Link: Link({
      title: 'Вернуться в настройки',
      href: 'javascript:void(0);',
      events: {
        click: (e:Event) => {
          e.stopPropagation();
          router.back();
        },
      }
    })
  })
}
