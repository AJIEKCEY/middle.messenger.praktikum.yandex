import serialize from "./baseUtil.ts";

export const REGISTRATION_FORM = {
  email : {
    label: 'Почта',
    id: 'email',
    tag: 'input',
    type: 'email',
    name: 'email',
    placeholder: 'Введите почту',
    hasError: false,
    validationMessage: 'Не валидная почта',
    events:{
      blur: function () {
        // @ts-ignore
        const input: HTMLInputElement = this.getContent() as HTMLInputElement;
        const regex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const valid = regex.test(input.value) || input.value.length > 0

        // @ts-ignore
        this.setProps({
          value: input.value,
          hasError: !valid,
        });
      }
    }
  },
  login : {
    label: 'Логин',
    id: 'login',
    tag: 'input',
    type: 'text',
    name: 'login',
    placeholder: 'Введите логин',
    hasError: false,
    validationMessage: 'Не валидный логин',
    events:{
      blur: function () {
        // @ts-ignore
        const input: HTMLInputElement = this.getContent() as HTMLInputElement;
        const regex: RegExp = /^(?=.*[a-zA-Z])[-\w]{3,20}$/;
        const valid = regex.test(input.value) || input.value.length > 0

        // @ts-ignore
        this.setProps({
          value: input.value,
          hasError: !valid,
        });
      }
    }
  },
  first_name : {
    label: 'Имя',
    id: 'first_name',
    tag: 'input',
    type: 'text',
    name: 'first_name',
    placeholder: 'Введите имя',
    hasError: false,
    validationMessage: 'Не валидное имя',
    events:{
      blur: function () {
        // @ts-ignore
        const input: HTMLInputElement = this.getContent() as HTMLInputElement;
        const regex: RegExp = /^[A-ZА-Я][a-zA-Zа-яА-Я]*$/;
        const valid = regex.test(input.value) || input.value.length > 0

        // @ts-ignore
        this.setProps({
          value: input.value,
          hasError: !valid,
        });
      }
    }
  },
  second_name : {
    label: 'Фамилия',
    id: 'second_name',
    tag: 'input',
    type: 'text',
    name: 'second_name',
    placeholder: 'Введите фамилию',
    hasError: false,
    validationMessage: 'Не валидная фамилия',
    events:{
      blur: function () {
        // @ts-ignore
        const input: HTMLInputElement = this.getContent() as HTMLInputElement;
        const regex: RegExp = /^[A-ZА-Я][a-zA-Zа-яА-Я]*$/;
        const valid = regex.test(input.value) || input.value.length > 0

        // @ts-ignore
        this.setProps({
          value: input.value,
          hasError: !valid,
        });
      }
    }
  },
  display_name : {
    label: 'Отображаемое имя',
    id: 'display_name',
    tag: 'input',
    type: 'text',
    name: 'display_name',
    placeholder: 'Введите отображаемое имя',
    hasError: false,
    validationMessage: 'Имя должно быть написано на латинице, от 3 до 20 символов, недопустимы спец символы и пробелы, ' +
      'допустимы дефис и нижнее подчёркивание',
    events:{
      blur: function () {
        // @ts-ignore
        const input: HTMLInputElement = this.getContent() as HTMLInputElement;
        const regex: RegExp = /^(?=.*[a-zA-Z])[-\w]{3,20}$/;
        const valid = regex.test(input.value) || input.value.length > 0

        // @ts-ignore
        this.setProps({
          value: input.value,
          hasError: !valid,
        });
      }
    }
  },
  phone : {
    label: 'Телефон',
    id: 'phone',
    tag: 'input',
    type: 'tel',
    name: 'phone',
    placeholder: 'Введите номер телефона',
    hasError: false,
    validationMessage: 'Не корректный номер',
    events:{
      blur: function () {
        // @ts-ignore
        const input: HTMLInputElement = this.getContent() as HTMLInputElement;
        const regex: RegExp = /^\+?\d{1,4}[-.\s]?(\(\d{1,5}\)|\d{1,5})[-.\s]?\d{1,5}[-.\s]?\d{1,5}[-.\s]?\d{1,5}[-.\s]?\d{1,5}$/;
        const valid = regex.test(input.value) || input.value.length > 0

        // @ts-ignore
        this.setProps({
          value: input.value,
          hasError: !valid,
        });
      }
    }
  },
  password: {
    label: 'Пароль',
    id: 'password',
    tag: 'input',
    type: 'password',
    name: 'password',
    placeholder: 'Введите пароль',
    hasError: false,
    validationMessage: 'Введите пароль',
    events:{
      blur: function () {
        // @ts-ignore
        const input: HTMLInputElement = this.getContent() as HTMLInputElement;
        const valid = input.value.length > 0

        // @ts-ignore
        this.setProps({
          value: input.value,
          hasError: !valid,
        });
      }
    }
  },
  password2: {
    label: 'Пароль (ещё раз)',
    id: 'password2',
    tag: 'input',
    type: 'password',
    name: 'password2',
    placeholder: 'Введите пароль еще раз',
    hasError: false,
    validationMessage: 'Введите пароль',
    events:{
      blur: function () {
        // @ts-ignore
        const input: HTMLInputElement = this.getContent() as HTMLInputElement;
        const valid = input.value.length > 0

        // @ts-ignore
        this.setProps({
          value: input.value,
          hasError: !valid,
        });
      }
    }
  },
  registrationBtn: {
    text: 'Зарегистрироваться',
    id: 'login__btn',
    tag: 'button',
    events:{
      click: function (e:Event) {
        e.preventDefault();
        e.stopPropagation();

        //@ts-ignore
        const formEl = e.target?.form;
        const formElements = formEl.querySelectorAll('input');
        let valid = true;
        formElements.forEach( (element:HTMLInputElement) => {
          if (element.value.length === 0)
            element.classList.add('warning');
          if (element.classList.contains('warning')){
            valid = false
          }
        })

        if (valid){
          const formData = new FormData(formEl)
          console.log(serialize(formData));
        }
      }
    }
  }
}

export const AUTHORIZATION_FORM = {
  login : {
    label: 'Логин',
    id: 'login',
    tag: 'input',
    type: 'text',
    name: 'login',
    placeholder: 'Введите логин',
    hasError: false,
    validationMessage: 'Не валидный логин',
    events:{
      blur: function () {
        // @ts-ignore
        const input: HTMLInputElement = this.getContent() as HTMLInputElement;
        const regex: RegExp = /^(?=.*[a-zA-Z])[-\w]{3,20}$/;
        const valid = regex.test(input.value) || input.value.length > 0

        // @ts-ignore
        this.setProps({
          value: input.value,
          hasError: !valid,
        });
      }
    }
  },
  password: {
    label: 'Пароль',
    id: 'password',
    tag: 'input',
    type: 'password',
    name: 'password',
    placeholder: 'Введите пароль',
    hasError: false,
    validationMessage: 'Введите пароль',
    events:{
      blur: function () {
        // @ts-ignore
        const input: HTMLInputElement = this.getContent() as HTMLInputElement;
        const valid = input.value.length > 0

        // @ts-ignore
        this.setProps({
          value: input.value,
          hasError: !valid,
        });
      }
    }
  },
  loginBtn: {
    text: 'Войти',
    id: 'login__btn',
    tag: 'button',
    events:{
      click: function (e:Event) {
        e.preventDefault();
        e.stopPropagation();

        //@ts-ignore
        const formEl = e.target?.form;
        const formElements = formEl.querySelectorAll('input');
        let valid = true;
        formElements.forEach( (element:HTMLInputElement) => {
          if (element.value.length === 0)
            element.classList.add('warning');
          if (element.classList.contains('warning')){
            valid = false
          }
        })

        if (valid){
          const formData = new FormData(formEl)
          console.log(serialize(formData));
        }
      }
    }
  }
}
