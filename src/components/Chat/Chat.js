import Avatar from "../Avatar/Avatar.js";
import "./chat.css"

class Chat {
  constructor(data, targetEl) {
    this.targetEl = targetEl;
    this.data = data;
  }

  unreadcountTmpl = (count) => `<div class="chat__unreadCount"><span>${count}</span></div>`

  template (data = this.data) {
    return `
      <li class="chat__item">
        ${new Avatar().template()}
        <div class="chat__content">
          <div class="chat__info">
             <h4>${data.name}</h4>
             <span class="chat__when">${data.when}</span>
          </div>
          <div class="chat__message">
             <p>${data.lastMessage.message}</p>
             ${data.unreadCount ? this.unreadcountTmpl(data.unreadCount) : ''}
          </div>
        </div>      
      </li>
    `
  }

  async render(){
    this.targetEl.innerHTML = this.template(this.data);
  }
}

export default Chat