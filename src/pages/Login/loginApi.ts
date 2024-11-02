import HTTPTransport from "../../core/api.ts";

const httpTransport = new HTTPTransport();
const host = 'https://ya-praktikum.tech/api/v2/auth/signin';


export default (data: Object) => {

  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json', // Данные отправляем в формате JSON
    },
    data
  }

  return httpTransport.post(host, options);
}
