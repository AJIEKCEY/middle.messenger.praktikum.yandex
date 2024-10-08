import Registration from "./Registration.ts";
import Link from "../../components/Atomics/Link";
import Settings from "../Settings";

export default (prop = {}) => {

  return new Registration({
    ...prop,
    GoBack: Link({
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
