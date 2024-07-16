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
      event.target.parentElement.remove();
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
      new Profile().render();
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
      <div class="settings__wrapper">
        <a href="" onclick="customEventListenersRender404(event)">Ошибка 404</a>
        <a href="" onclick="customEventListenersRender500(event)">Ошибка 500</a>
        <a href="" onclick="customEventListenersRenderProfile(event)">Профиль</a>
        <a href="" onclick="customEventListenersRenderRegistration(event)">Регистрация</a>
        <a href="" onclick="customEventListenersRenderAuthorization(event)">Авторизация</a>
        <a href="" onclick="customEventListenersRemove(event)">Назад к сообщениям</a>
        
      </div>   
    `
  }

  render(){
    document.body.insertAdjacentHTML("beforeend", this.template(this.data));
    this.eventListeners();
  }
}

export default Settings
