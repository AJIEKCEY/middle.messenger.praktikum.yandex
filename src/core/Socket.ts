import HTTPTransport from "./api.ts";
import EventBus from "./EventBus.ts";

export default class Socket {
  private _hostWS = 'wss://ya-praktikum.tech/ws';
  private _hostHTTP = 'https://ya-praktikum.tech';
  private _httpTransport: HTTPTransport;
  protected _chatId: number = 0;
  protected _token: string = '';
  protected _socket: WebSocket | null = null;
  protected _eventBus;

  constructor() {
    const eventBus: EventBus = new EventBus();

    this._httpTransport = new HTTPTransport();
    this._eventBus = () => eventBus;
  }

  private async getToken():Promise<boolean>{
    const result = await this._httpTransport.post(`${this._hostHTTP}/api/v2/chats/token/${this._chatId}`, {});
    this._token = JSON.parse(result.responseText).token;
    return true
  }

  public async connect(chatId: number, userId: number):Promise<WebSocket>{
    this._chatId = chatId;

    await this.getToken();

    this._socket = new WebSocket(`${this._hostWS}/chats/${userId}/${chatId}/${this._token}`)

    this._socket.addEventListener('open', () => {
      console.info(`Соединение с узлом ${this._hostWS} установлено`);
      document.dispatchEvent(new Event("WSOpen"));
    });

    this._socket.addEventListener('close', event => {
      if (event.wasClean) {
        console.info('Соединение закрыто чисто');
      } else {
        console.info('Обрыв соединения');
      }

      console.info(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this._socket.addEventListener('error', event => {
        console.log('Ошибка', (event as ErrorEvent).message);
    });

    return this._socket;
  }

  public obtain(callback: Function){
    this._socket?.addEventListener('message', event => callback(event));
  }

  public send(data:object){
    this._socket?.send(JSON.stringify(data))
  }

}
