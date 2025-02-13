import HTTPTransport from "../../../core/api.ts";
import {BASE_URL_HTTP_API} from "../../../core/consts.ts";
import Store from "../../../core/Store";

export default  class ManageChatUsersApi extends HTTPTransport {
  private host = `${BASE_URL_HTTP_API}/chats/users`;
  private readonly chatId: number;

  constructor(){
    super();

    this.chatId = Number(Store.state.chatId);
  }

  async addUsers(userIds: number[]){
    const payload = {
      users: userIds,
      chatId: this.chatId
    }

    await this.put(this.host, {
      data: JSON.stringify(payload),
    })
  }

  async deleteUsers(userIds: number[]){
    const payload = {
      users: userIds,
      chatId: this.chatId
    }

    await this.delete(this.host, {
      data: JSON.stringify(payload),
    })
  }
}
