import HTTPTransport from "../../core/api.ts";

const baseHost = 'https://ya-praktikum.tech/api/v2/';

export default class profileApi extends HTTPTransport{
  constructor() {
    super();
  }

  async getUserData() {
    const res = await this.get(`${baseHost}auth/user`)

    console.log(JSON.parse(res.response));

    return JSON.parse(res.response)
  }

  async sendAvatar(data: FormData){
    await this.put(`${baseHost}user/profile/avatar`, {
      headers: {
        'Accept': 'application/json',
      },
      data: data
    })
  }

  async sendUserProfile(data: unknown){
    await this.put(`${baseHost}user/profile`, {
      data: JSON.stringify(data)
    })
  }

  async sendNewPassword(data: unknown){
    await this.put(`${baseHost}user/password`, {
      data: JSON.stringify(data)
    })
  }
}
