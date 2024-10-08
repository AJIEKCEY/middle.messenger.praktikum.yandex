import Error from "./Error.ts"
import Link from "../../Atomics/Link";
import Settings from "../../../pages/Settings"


export default (prop = {}) => {
  return new Error({
    ...prop,
    Link: Link({
      title: 'Вернуться в настройки',
      href: 'javascript:void(0);',
      events: {
        click: (e:Event) => {
          e.stopPropagation();
          window.app.setProps({currentPage: Settings()})
        },
      }
    })
  })
}
