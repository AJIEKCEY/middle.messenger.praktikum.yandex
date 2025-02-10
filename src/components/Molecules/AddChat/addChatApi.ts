import HTTPTransport from "../../../core/api.ts";

const httpTransport = new HTTPTransport();
const host = 'https://ya-praktikum.tech/api/v2/chats';

export default (chatName: string) => {
  if (chatName.trim().length > 0){
    const data = {  title: chatName }
    return httpTransport.post(host, {data});
  }
  throw new Error('Chat name must be specified.');
}
