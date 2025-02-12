import HTTPTransport from "../../core/api.ts";
import {BASE_URL_HTTP_API} from "../../core/consts.ts";

export default class profileApi extends HTTPTransport{
  constructor() {
    super();
  }

  async getUserData() {
    const res = await this.get(`${BASE_URL_HTTP_API}/auth/user`);

    console.log(JSON.parse(res.response));

    return JSON.parse(res.response);
  }

  async sendAvatar(data: FormData){
    await this.put(`${BASE_URL_HTTP_API}user/profile/avatar`, {
      headers: {
        'Accept': 'application/json',
      },
      data: data
    })
  }

  async sendUserProfile(data: unknown){
    await this.put(`${BASE_URL_HTTP_API}user/profile`, {
      data: JSON.stringify(data)
    })
  }

  async sendNewPassword(data: unknown){
    await this.put(`${BASE_URL_HTTP_API}user/password`, {
      data: JSON.stringify(data)
    })
  }
}
