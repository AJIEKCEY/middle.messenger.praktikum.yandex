import Component from "../../core/Component/component.ts";
import template from "./settings.tpl.ts";

import "./settings.css"
import Router from "../../core/Router/Router.ts";
import Link from "../../components/Atomics/Link/Link.ts";
import HTTPTransport from "../../core/HTTPTransport/HTTPTransport.ts";
import {ComponentProps} from "../../core/types.ts";
import {BASE_URL_HTTP_API} from "../../core/consts.ts";

const router = new Router()

const links:Component<ComponentProps>[] = [];

const page404 = new Link({
  title: 'Ошибка 404',
  href: 'javascript:void(0);',
  events: {
    click: (e:Event) => {
      e.preventDefault();
      router.go("/error?kod=404&message=Не туда попали");
    },
  },
})

links.push(page404);

const page500 = new Link({
  title: 'Ошибка 500',
  href: 'javascript:void(0);',
  events: {
    click: (e:Event) => {
      e.preventDefault();
      router.go("/error?kod=500&message=Мы уже исправляем");
    },
  },
})

links.push(page500);

const profile = new Link({
  title: 'Профиль',
  href: 'javascript:void(0);',
  events: {
    click: (e:Event) => {
      e.preventDefault();
      router.go("/settings");
    },
  },
})

links.push(profile);

const login = new Link({
  title: 'Вход',
  href: 'javascript:void(0);',
  events: {
    click: (e:Event) => {
      e.preventDefault();
      router.go("/sign-in")
    },
  },
})

links.push(login);

const registration = new Link({
  title: 'Регистрация',
  href: 'javascript:void(0);',
  events: {
    click: (e:Event) => {
      e.preventDefault();
      router.go("/sign-up")
    },
  },
})

links.push(registration);

const logout = new Link({
  title: 'Выход',
  href: 'javascript:void(0);',
  events: {
    click: (e:Event) => {
      e.preventDefault();

      const httpTransport = new HTTPTransport();
      const host = `${BASE_URL_HTTP_API}/auth/logout`;

      const options = {
        headers: {
          'content-type': 'application/json', // Данные отправляем в формате JSON
        },
      }

      httpTransport.post(host, options)
        .then( () => {
          router.go("/sign-in")
        })

    },
  },
})

links.push(logout);

export default class Settings extends Component<ComponentProps>{
  constructor() {
    super({
      links: links
    });
  }

  override render() {
    this.compile(template, this._props);
  }
}
