import Router from "./src/core/Router.ts";
import {} from "./src/core/types.ts"
import './src/utils/helpers/handlebarsHelpers';
import Login from "./src/pages/Login";
import Registration from "./src/pages/Registration";
import Messenger from "./src/pages/Messenger";
import Profile from "./src/pages/Profile";
import App from "./src/App";
import Settings from "./src/pages/Settings";

document.addEventListener('DOMContentLoaded', () => {

  window.app = App;

  const router = new Router();

  router
    .use("/Messenger", Messenger)
    .use("/Login", Login)
    .use("/Registration", Registration)
    .use("/Profile", Profile)
    .use("/Settings", Settings)
    .start(App)

  const targetEl = document.querySelector('#app');

  if (targetEl){
    targetEl.appendChild(App.getContent());
    return true
  } else {
    console.error('Not found element width selector: ', targetEl)
    return false
  }
});
