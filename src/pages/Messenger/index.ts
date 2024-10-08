import Messenger from './Messenger.ts'
import Discussion from "../../components/Organisms/Discussion";
import Chats from '../../components/Organisms/Chats';

export default (props = {}) => {

  return new Messenger({
    ...props,
    Chats : Chats(),
    Discussion : Discussion()
  })
}
