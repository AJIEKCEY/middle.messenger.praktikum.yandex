import ChatList from "./ChatList.ts";
import Chat from "../../Molecules/Chat";
import chatList from "../../../mock/chats.ts"


export default function(props = {}) {

  const clearSelectedChatUi = () => {
    document.querySelector('li.chat__item_active')?.classList.remove('chat__item_active');
  }
  const setCurrentChatActiveUi = (chatId:string) => {
    document.querySelector(`li.chat__item[data-chat-id="${chatId}"]`)?.classList.add('chat__item_active');
  }

  const getNewChatComponent = (chatProps:any) => Chat({
    ...chatProps,
    events: {
      click : (e: Event) => {

        const currentTarget = <HTMLLIElement>e.currentTarget;
        const chatId = currentTarget.dataset.chatId;
        clearSelectedChatUi();
        if (chatId)
          setCurrentChatActiveUi(chatId)
          const chatName = (currentTarget.querySelector(".chat__info > h4"))?.innerHTML
          document.dispatchEvent(new CustomEvent(
            'chatSelected',
            {detail:
                {
                  chatId,
                  chatName
                }
            }
          ))
      },
    },
  })

  const chats =  chatList.map( (chatProps:any) => {
    return getNewChatComponent(chatProps);
  })

  const chatsList = new ChatList(
    {
      ...props,
      chats: chats,
      attr: {
        class: 'left-block'
      },
    }
  );

  const filteredChats = (substring: string) => {

    const chats:object[] = [];

    chatList.map( (chatProps:any) => {
      if (chatProps.name.toLowerCase().includes(substring.toLowerCase())){
        chats.push(getNewChatComponent(chatProps)) ;
      };
    })
    return chats;
  }

  // @ts-ignore
  document.addEventListener('searchInputChange', (e: CustomEvent) => {
    chatsList.setProps({chats: filteredChats(e.detail)})
  })

  return chatsList
};
