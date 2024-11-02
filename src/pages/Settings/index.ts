import Settings from "./Settings.ts";
import Link from "../../components/Atomics/Link";
import Error from "../../components/Organisms/Error";
import Router from "../../core/Router.ts";
import HTTPTransport from "../../core/api.ts";

const router = new Router()

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
      router.go("/Profile");
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
      router.go("/Login")
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
      router.go("/Registration")
    },
  },
})

links.push(registration);

const logout = Link({
  title: 'Выход',
  href: 'javascript:void(0);',
  events: {
    click: (e:Event) => {
      e.preventDefault();

      const httpTransport = new HTTPTransport();
      const host = 'https://ya-praktikum.tech/api/v2/auth/logout';

      const options = {
        headers: {
          'content-type': 'application/json', // Данные отправляем в формате JSON
        },
      }

      httpTransport.post(host, options)
        .then( () => {
          router.go("/Login")
        })

    },
  },
})

links.push(logout);

export default new Settings({
  links: links,
})
