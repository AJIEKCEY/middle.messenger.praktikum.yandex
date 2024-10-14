import Chat from "./Chat.ts";
import Avatar from "../../Organisms/Avatar";

export default (chatProps = {}) => {
  return new Chat(
    {
      ...chatProps,
      avatar: Avatar(),
    }
  )
}
