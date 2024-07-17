import "./profile.css"
import Avatar from "../Avatar/Avatar.js";

class Profile{
  constructor(data) {
    this.data = data;
    this.userdata = {
      email: "pochta@yandex.ru",
      login: "ivanivanov",
      first_name: "Иван",
      second_name: "Иванов",
      display_name: "Иван",
      phone: "+7 (909) 967 30 30"
    }
  }

  renderUserData(action){
    if (action === "view") {
      return`
        <div class="profile__data">
          <p><strong>Почта</strong><span>${this.userdata.email}</span></p>
          <p><strong>Логин</strong><span>${this.userdata.login}</span></p>
          <p><strong>Имя</strong><span>${this.userdata.first_name}</span></p>
          <p><strong>Фамилия</strong><span>${this.userdata.second_name}</span></p>
          <p><strong>Имя в чате</strong><span>${this.userdata.display_name}</span></p>
          <p><strong>Телефон</strong><span>${this.userdata.phone}</span></p>
        </div>
      `
    } else if (action === "edit") {
      return `
        <form class="profile__data">
          <p><strong>Почта</strong><input type="text" name="email" placeholder="${this.userdata.email}"></p>
          <p><strong>Логин</strong><input type="text" name="login" placeholder="${this.userdata.login}"></p>
          <p><strong>Имя</strong><input type="text" name="first_name" placeholder="${this.userdata.first_name}"></p>
          <p><strong>Фамилия</strong><input type="text" name="second_name" placeholder="${this.userdata.second_name}"></p>
          <p><strong>Имя в чате</strong><input type="text" name="display_name" placeholder="${this.userdata.display_name}"></p>
          <p><strong>Телефон</strong><input type="text" name="phone" placeholder="${this.userdata.phone}"></p>
        </form>
      `
    } else if ( action === "editPassword") {
      return `
         <form class="profile__data">
          <p><strong>Старый пароль</strong><input type="password" name="password"></p>
          <p><strong>Новый пароль</strong><input type="password" name="passwordNew1"></p>
          <p><strong>Повторите новый пароль</strong><input type="password" name="passwordNew2"></p>
        </form>
      `
    }
  }

  renderButtons(action) {
    if (action === "view") {
      return `
        <p class="profile__link color-blue">Изменить данные</p>
        <p class="profile__link color-blue">Изменить пароль</p>
      `
    } else if (action === "edit" || action === "editPassword") {
      return `
        <button>Сохранить</button>
      `
    }
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
      <h3>${this.userdata.first_name}</h3>
      ${this.renderUserData(this.data.type)}
      ${this.renderButtons(this.data.type)}
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
