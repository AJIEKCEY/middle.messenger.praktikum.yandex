import "./profile.css"
import Avatar from "../Avatar/Avatar.js";

class Profile{
  constructor(data) {
    if (!data) {
      data = {
        email: "pochta@yandex.ru",
        login: "ivanivanov",
        firstName: "Иван",
        lastName: "Иванов",
        name: "Иван",
        phone: "+7 (909) 967 30 30"
      }
    }
    this.data = data;
  }

  eventListeners(){
    document.customEventListenersRemove = (event) => {
      event.preventDefault();
      event.target.parentElement.remove();
    }
  }

  template(data = this.data){
    return `
    <div class="profile_wrapper">
      ${new Avatar().template()}
      <h3>${this.data.name}</h3>
      <div class="profile__data">
        <p><strong>Почта</strong><span>${this.data.email}</span></p>
        <p><strong>Логин</strong><span>${this.data.login}</span></p>
        <p><strong>Имя</strong><span>${this.data.firstName}</span></p>
        <p><strong>Фамилия</strong><span>${this.data.lastName}</span></p>
        <p><strong>Имя в чате</strong><span>${this.data.name}</span></p>
        <p><strong>Телефон</strong><span>${this.data.phone}</span></p>
      </div>
      <p class="profile__link color-blue">Изменить данные</p>
      <p class="profile__link color-blue">Изменить пароль</p>
      <p class="profile__link color-red" onclick="customEventListenersRemove(event)">Выйти</p>
    </div>  
    `
  }

  render(){
    document.body.insertAdjacentHTML("beforeend", this.template(this.data));
    this.eventListeners();
  }

}

export default Profile
