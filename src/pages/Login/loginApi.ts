import HTTPTransport from "../../core/api.ts";

const httpTransport = new HTTPTransport();
const host = 'https://ya-praktikum.tech/api/v2/auth/signin';


export default (data: Object) => {
  return httpTransport.post(host, {data});
}
