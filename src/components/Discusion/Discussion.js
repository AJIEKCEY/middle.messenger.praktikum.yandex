import Message from "../Message/Message.js";
import Avatar from "../Avatar/Avatar.js";
import discussion from "../../mock/discussion.js"
import "./discussion.css"

class Discussion {
  constructor(data, targetEl) {
    this.targetEl = targetEl;
    this.data = data;
  }

  renderMessages(){
    let chatList = [];

    discussion.messages.map((message) => {
      chatList.push(new Message().template(message))
    })

    return chatList.join('')
  }

  template (data = this.data) {
    return `
      <div class="discussion__wrapper">
        <div class="discussion__header">
          ${new Avatar().template()}
          <h2>Вадим</h2>
          <div class="header__menu">O</div>
        </div>
        <div class="discussion__messages">
          ${this.renderMessages()}
        </div>        
        <div class="discussion__input">
          <div class="discussion__input__buttons"></div>
          <input type="text">
          <button> > </button>
        </div>
      </div>   
    `
  }

  async render(){
    this.targetEl.innerHTML = this.template(this.data);
  }
}

export default Discussion
