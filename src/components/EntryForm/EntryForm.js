import {REGISTRATION_FORM, AUTHORIZATION_FORM} from "../../utils/formsDescription.js";
import "./entryform.css";

class EntryForm{
  constructor(data) {
    this.data = data;
    if (this.data.type !== "registration"){
      this.context = AUTHORIZATION_FORM;
    }else{
      this.context = REGISTRATION_FORM;
    }
  }

  renderFields(fields){
    let html = []
    fields.map( (field) => {
      html.push(`
        <label for="${field.id}">${field.label}</label>
        <input type="${field.type}" id="${field.id}" name="${field.id}"> 
        `
      )
    })

    return html.join('');
  }

  eventListeners(){
    document.customEventListenersRemove = (event) => {
      event.preventDefault();
      event.target.parentElement.remove();
    }
  }

  template(ctx){
    return`
      <div class="entryform__wrapper">
        <div class="entryform__item">
          <h1>${ctx.formName}</h1>
          <form action="">
            ${this.renderFields(ctx.fields)}
          </form>
          <button>${ctx.buttonLabel}</button>
          <p class="color-blue">${ctx.linkLabel}</p>
          
          <p class="color-blue" onclick="customEventListenersRemove(event)">Вернуться</p>
        </div>  
      </div>  
    `
  }

  render(){
    document.body.insertAdjacentHTML("beforeend", this.template(this.context));
    this.eventListeners();
  }

}

export default EntryForm
