import Router from "./src/core/Router/Router.ts";
import './src/utils/helpers/handlebarsHelpers';
import Login from "./src/pages/Login/Login";
import Registration from "./src/pages/Registration/Registration";
import Messenger from "./src/pages/Messenger/Messenger";
import Error from "./src/pages/Error/Error";
import Profile from "./src/pages/Profile/Profile";
import App from "./src/App/App.ts";
import Settings from "./src/pages/Settings/Settings";

document.addEventListener('DOMContentLoaded', async () => {

  const app = await App.initialize();
  window.app = app

  const router = new Router();

  router
    .use("/", Login)
    .use("/messenger", Messenger)
    .use("/sign-in", Login )
    .use("/sign-up", Registration)
    .use("/links", Settings)
    .use("/settings", Profile)
    .use("/error", Error)
    .start(app)

  const targetEl = document.querySelector('#app');

  if (targetEl){
    targetEl.appendChild(app.getContent());
    return true
  } else {
    console.error('Not found element width selector: ', targetEl)
    return false
  }
});
