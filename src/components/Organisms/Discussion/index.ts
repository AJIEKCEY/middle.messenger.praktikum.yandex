import Discussion from "./Discussion.ts";
import Avatar from "../Avatar";
import Message from "../../Molecules/Message";
import discussionService from "../../../mock/discussion.ts";

export default function(props = {}) {
  const CURRENT_USER_ID = 6543213;

  const discussionComponent =  new Discussion(
    {
      ...props,
    }
  )

  document.addEventListener('chatSelected', ((e: CustomEvent) => {
    console.log(e.detail);
    const discussion = getDiscussion(e.detail.chatId);
    if (discussion) {
      const messages = discussion.messages.map((messageProps:any ) =>
        Message({
          ...messageProps,
          isMyMessage : CURRENT_USER_ID === messageProps.user
        })
      );

      discussionComponent.setProps({
        avatar: Avatar(),
        chatName: e.detail.chatName,
        messages: messages
      })
    } else {
      discussionComponent.setProps({
        avatar: Avatar(),
        chatName: e.detail.chatName,
        messages: null
      })
    }
  }) as EventListener)

  const getDiscussion = (chatId:number) => {
    return discussionService.find((item) => item.chatId == chatId);
  }

  return discussionComponent;
}
