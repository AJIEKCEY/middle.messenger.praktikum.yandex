import Chat from "../Chat/Chat.js";
import chatsMock from "../../mock/chats.js"
import Settings from "../Settings/Settings.js";

import "./chats.css"

class Chats {
  constructor(data, targetEl) {
    this.targetEl = targetEl;
    this.data = data;
  }

  renderChatList(){
    let chatList = [];

    chatsMock.map((chat) => {
      chatList.push(new Chat().template(chat))
    })

    return chatList.join('')
  }

  eventListeners() {
    document.addEventListener('DOMContentLoaded',() => {
      const el = document.querySelector('.search__item .commands_item')

      el.addEventListener('click', () => {
        new Settings().render();
      })
    })
  }

  template (data = this.data) {
    return `
      <div class="chats__wrapper">
        <div class="search__item">
          <div class="search__input">
            <input type="text">
            <button class="search__btn"></button>
          </div>
          <div class="commands_item"></div>        
        </div>
        <ul class="chats__item">${this.renderChatList()}</ul>
      </div>   
    `
  }

  async render(){
    this.targetEl.innerHTML = this.template(this.data);
  }
}

export default Chats