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

// function addChat (chatName: string): void {
//   if (chatName.trim().length > 0){
//     const data = {  title: chatName }
//     httpTransport
//       .post( host, { data } )
//       .then( XHRResponse => {
//
//         console.log(XHRResponse.responseText)
//       }).catch(e => {
//       console.log(e);
//     });
//   }
// }
