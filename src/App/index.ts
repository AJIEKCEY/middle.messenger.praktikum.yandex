import Router from "../core/Router.ts";
import App from './App.ts'
import HTTPTransport from "../core/api.ts";

const router = new Router()

const httpTransport = new HTTPTransport();
const host = 'https://ya-praktikum.tech/api/v2/auth/user';

const options = {
  method: 'GET',
  headers: {
    'content-type': 'application/json', // Данные отправляем в формате JSON
  },
}

 httpTransport.get(host, options)
   .then( XHRResponse => {
     console.error(XHRResponse.responseText)
     if (XHRResponse.status === 200){
       router.go('/Messenger');
     } else {
       router.go('/Login');
     }
   })

export default new App({})
