// import ChatList from "./ChatList.ts";
// import Chat from "../../Molecules/Chat";
// import chatListApi from "./chatListApi.ts";
// import Router from "../../../core/Router.ts";
// import {ComponentProps} from "../../../core/types.ts";
// //import Discussion from "../Discussion/Discussion.ts";
// import Store from "../../../core/Store"
//
// export default function(props = {}) {
//
//   const router = new Router()
//
//   let chatList:ComponentProps[] = [];
//
//   const clearSelectedChatUi = () => {
//     document.querySelector('li.chat__item_active')?.classList.remove('chat__item_active');
//   }
//   const setCurrentChatActiveUi = (chatId:string) => {
//     document.querySelector(`li.chat__item[data-chat-id="${chatId}"]`)?.classList.add('chat__item_active');
//   }
//
//   const getNewChatComponent = (chatProps:ComponentProps) => Chat({
//     ...chatProps,
//     events: {
//       click : (e: Event) => {
//         e.stopPropagation();
//         const currentTarget = <HTMLLIElement>e.currentTarget;
//         const chatId = currentTarget.dataset.chatId;
//         const chatName = (currentTarget.querySelector(".chat__info > h4"))?.innerHTML
//         clearSelectedChatUi();
//         if (chatId){
//           setCurrentChatActiveUi(chatId)
//           Store.dispatch('setChatId', chatId)
//           Store.dispatch('setChatName', chatName)
//         }
//       },
//     },
//   })
//
//   chatListApi()
//     .then( XHRResponse => {
//       if (XHRResponse.status === 200) {
//         console.log(JSON.parse(XHRResponse.responseText))
//         const chatList = JSON.parse(XHRResponse.responseText)
//         const chats = chatList.map((chatProps: ComponentProps) => {
//           return getNewChatComponent(chatProps);
//         })
//         chatsList.setProps({chats})
//       } else if (XHRResponse.status === 401){
//         router.go('/Login');
//       } else {
//         console.error(XHRResponse.responseText)
//       }
//     })
//     .catch( e => {
//       console.log(e)
//     })
//   const chatsList = new ChatList(
//     {
//       ...props,
//       attr: {
//         class: 'left-block'
//       },
//     }
//   );
//
//   const filteredChats = (substring: string) => {
//
//     const chats:object[] = [];
//
//     if (chatList.length > 0){
//       chatList.map( (chatProps:ComponentProps) => {
//         const chatName = chatProps.name
//         if (typeof chatName === 'string' && chatName.toLowerCase().includes(substring.toLowerCase())){
//           chats.push(getNewChatComponent(chatProps)) ;
//         };
//       })
//     }
//     return chats;
//   }
//
//   //@ts-expect-error    надо разобраться с CustomEvent
//   document.addEventListener('searchInputChange', (evt: CustomEvent) => {
//     chatsList.setProps({chats: filteredChats(evt.detail)})
//   })
//
//   return chatsList
// };
