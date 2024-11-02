import HTTPTransport from "../../core/api.ts";

const httpTransport = new HTTPTransport();
const host = 'https://ya-praktikum.tech/api/v2/auth/signup';


export default (data: Object) => {

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json', // Данные отправляем в формате JSON
    },
    data
  }

  return httpTransport.post(host, options);
}
