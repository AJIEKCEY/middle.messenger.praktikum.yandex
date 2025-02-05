import HTTPTransport from "../../../core/api.ts";

const httpTransport = new HTTPTransport();
const host = 'https://ya-praktikum.tech/api/v2/chats';


export default () => {
  return httpTransport.get(host, {})
}
