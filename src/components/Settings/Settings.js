import Error from "../Error/Error.js";
import Profile from "../Profile/Profile.js";

import "./settings.css"
import EntryForm from "../EntryForm/EntryForm.js";

class Settings{
  constructor(data) {
    this.data = data;
  }

  eventListeners() {
    document.customEventListenersRemove = (event) => {
      event.preventDefault();
      event.target.closest(".settings__wrapper").remove();
    }

    document.customEventListenersRender404 = (event) => {
      event.preventDefault();
      new Error({kod:404, message:'Не туда попали'}).render();
    }

    document.customEventListenersRender500 = (event) => {
      event.preventDefault();
      new Error({kod:500, message:'Мы уже исправляем'}).render();
    }

    document.customEventListenersRenderProfile = (event) => {
      event.preventDefault();
      new Profile({type: "view"}).render();
    }

    document.customEventListenersRenderProfileEdit = (event) => {
      event.preventDefault();
      new Profile({type: "edit"}).render();
    }

    document.customEventListenersRenderRegistration = (event) => {
      event.preventDefault();
      new EntryForm({type: 'registration'}).render();
    }

    document.customEventListenersRenderAuthorization = (event) => {
      event.preventDefault();
      new EntryForm({type: 'authorization'}).render();
    }
  }

  template (data = this.data) {
    return `
      <nav class="settings__wrapper">
        <ul>
          <li><a href="" onclick="customEventListenersRender404(event)">Ошибка 404</a></li>
          <li><a href="" onclick="customEventListenersRender500(event)">Ошибка 500</a></li>
          <li><a href="" onclick="customEventListenersRenderProfile(event)">Профиль</a></li>
          <li><a href="" onclick="customEventListenersRenderProfileEdit(event)">Профиль Редактирование</a></li>
          <li><a href="" onclick="customEventListenersRenderRegistration(event)">Регистрация</a></li>
          <li><a href="" onclick="customEventListenersRenderAuthorization(event)">Авторизация</a></li>
          <li><a href="" onclick="customEventListenersRemove(event)">Назад к сообщениям</a></li>
        </ul>
      </nav>   
    `
  }

  render(){
    document.body.insertAdjacentHTML("beforeend", this.template(this.data));
    this.eventListeners();
  }
}

export default Settings
