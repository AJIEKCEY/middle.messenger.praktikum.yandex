import Chats from "./Chats.ts";
import Button from "../../Atomics/Button";
import SearchBar from "../../Molecules/SearchBar";
import ChatList from "../../Organisms/ChatList";
import Settings from "../../../pages/Settings";

export default function(props = {}) {

  const settingsPage = Settings()

  const settingsButton = Button({
    events: {
      click: (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        window.app.setProps({currentPage : settingsPage})
      },
    },
    attr: {
      class: 'commands_item',
    },
  })

  const searchBar = SearchBar()

  const chatList = ChatList();

  const chatsComponent = new Chats(
    {
      ...props,
      SearchBar: searchBar,
      Settings: settingsButton,
      ChatList: chatList,
      attr: {
        class: 'chats__wrapper'
      },
    }
  );

  return chatsComponent
};
