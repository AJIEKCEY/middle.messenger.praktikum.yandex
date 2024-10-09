import App from './App.ts'
import Messenger from "../pages/Messenger";
//import Login from "../pages/Login";

export default (props = {}) => {

  const messengerPage = Messenger();
  //const logIn = Login();

  const app =  new App({
    ...props,
    //currentPage : logIn,
    currentPage : messengerPage,
  })

  window.app = app;

  return app
}
