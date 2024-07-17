import "./error.css"

class Error {
  constructor(data) {
    this.data = data;
  }

  eventListeners() {
    document.customEventListenersRemove = (event) => {
      event.preventDefault();
      event.target.parentElement.remove();
    }
  }

  template (data = this.data) {
    return `
      <div class="error__wrapper">
        <h1>${data.kod}</h1>
        <p>${data.message}</p>
        <a href="" onclick="customEventListenersRemove(event)">Назад</a>
      </div>   
    `
  }

  render(){
    document.body.insertAdjacentHTML("beforeend", this.template(this.data));
    this.eventListeners();
  }
}

export default Error
