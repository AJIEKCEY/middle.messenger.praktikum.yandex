import HTTPTransport from "../../../core/HTTPTransport/HTTPTransport.ts";
import {BASE_URL_HTTP_API} from "../../../core/consts.ts";

const httpTransport = new HTTPTransport();
const host = `${BASE_URL_HTTP_API}/chats`;


export default () => {
  return httpTransport.get(host, {})
}
