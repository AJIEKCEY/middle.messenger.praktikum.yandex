import HTTPTransport from "../../core/api.ts";
import {BASE_URL_HTTP_API} from "../../core/consts.ts";

const httpTransport = new HTTPTransport();
const host = `${BASE_URL_HTTP_API}/auth/signin`;


export default (data: unknown) => {
  return httpTransport.post(host, {data});
}
