import "./message.css"

class Message{
  constructor(data) {
    this.data = data;
  }

  CURRENT_USER_ID = '6543213'

  renderMessage(data){
    if (data.type === 'text') {
      return `<p>${ data.value }</p>`
    }

    if (data.type === 'url'){
      return `<a href="${ data.value }">${ data.value }</a>`
    }
  }

  template (data = this.data) {
    return  `
      <div class="message__item ${data.user === this.CURRENT_USER_ID ? 'message__item_right' : 'message__item_left'}">
        <div class="message_content">
          ${ this.renderMessage(data) }
        </div>
        <div class="message_time">
          ${ data.timestamp }
        </div>
      </div>
    `
  }
}

export default Message
