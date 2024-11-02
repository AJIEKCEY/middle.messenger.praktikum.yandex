import Messenger from './Messenger.ts'
import Discussion from "../../components/Organisms/Discussion";
import Chats from '../../components/Organisms/Chats';


export default new Messenger({
  Chats : Chats(),
  Discussion : Discussion()
})
