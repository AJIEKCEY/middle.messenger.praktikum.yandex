import Chats from "./Chats.ts";
import Button from "../../Atomics/Button";
import SearchBar from "../../Molecules/SearchBar";
import ChatList from "../../Organisms/ChatList";
import Router from "../../../core/Router.ts";

const router = new Router();

export default function(props = {}) {

  const settingsButton = Button({
    events: {
      click: (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        router.go("/Settings")
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
