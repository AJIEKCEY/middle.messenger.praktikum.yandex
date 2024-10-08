//import { default as renderDOM } from "./src/utils/render"
import App from './src/App'
//import Chats from "./src/components/Chats"
//import Discussion from "./src/components/Discussion"

//@ts-ignore
document.customEventListeners = null;

document.addEventListener('DOMContentLoaded', () => {
  const app = App()


    const targetEl = document.querySelector('#app');

    if (targetEl){
      targetEl.appendChild(app.getContent());
      return true
    } else {
      console.error('Not found element width selector: ', targetEl)
      return false
    }
    //this.chats.eventListeners();

});


