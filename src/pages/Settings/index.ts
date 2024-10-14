import Settings from "./Settings.ts";
import Link from "../../components/Atomics/Link";
import Error from "../../components/Organisms/Error";
import Profile from "../Profile";
import Login from "../Login";
import Registration from "../Registration";
//import Button from "../../components/Atomics/Button";

export default (prop = {}) => {

  const links = [];

  const page404 = Link({
    title: 'Ошибка 400',
    href: 'javascript:void(0);',
    events: {
      click: (e:Event) => {
        e.preventDefault();
        window.app.setProps({currentPage: Error({kod: 404, message: 'Не туда попали'})})
      },
    },
  })

  links.push(page404);

  const page500 = Link({
    title: 'Ошибка 500',
    href: 'javascript:void(0);',
    events: {
      click: (e:Event) => {
        e.preventDefault();
        window.app.setProps({currentPage: Error({kod: 500, message: 'Мы уже исправляем'})})
      },
    },
  })

  links.push(page500);

  const profile = Link({
    title: 'Профиль',
    href: 'javascript:void(0);',
    events: {
      click: (e:Event) => {
        e.preventDefault();
        window.app.setProps({currentPage: Profile()})
      },
    },
  })

  links.push(profile);

  const login = Link({
    title: 'Вход',
    href: 'javascript:void(0);',
    events: {
      click: (e:Event) => {
        e.preventDefault();
        window.app.setProps({currentPage: Login()})
      },
    },
  })

  links.push(login);

  const registration = Link({
    title: 'Регистрация',
    href: 'javascript:void(0);',
    events: {
      click: (e:Event) => {
        e.preventDefault();
        window.app.setProps({currentPage: Registration()})
      },
    },
  })

  links.push(registration);

  return new Settings({
    ...prop,
    links: links,
  })
};
