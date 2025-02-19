import HTTPTransport from "../../../core/HTTPTransport/HTTPTransport.ts";
import {BASE_URL_HTTP_API} from "../../../core/consts.ts";

const httpTransport = new HTTPTransport();
const host = `${BASE_URL_HTTP_API}/chats`;

export default (chatName: string) => {
  if (chatName.trim().length > 0){
    const data = {  title: chatName }
    return httpTransport.post(host, {data});
  }
  throw new Error('Chat name must be specified.');
}
