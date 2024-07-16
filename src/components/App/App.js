import Chats from '../Chats/Chats.js';
import Discussion from "../Discusion/Discussion.js";
import './app.css';

class App {
  constructor(data, targetEl) {
    this.targetEl = targetEl;
    this.data = data;
  }

  chats = new Chats('Это работает');
  discussion = new Discussion('Модуль Discussion')

  template (data = this.data) {
    return `
      <div class="left-block">${this.chats.template()}</div>
      ${this.discussion.template()}
    `
  }

  render() {
    this.targetEl.innerHTML = this.template(this.data);

    this.chats.eventListeners();
  }


}

export default App;