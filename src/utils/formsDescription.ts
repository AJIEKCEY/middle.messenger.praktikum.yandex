export const REGISTRATION_FORM = {
  formName: "Регистрация",
  buttonLabel: "Зарегистрироваться",
  linkLabel: "Войти",
  fields: [
    {
      id: "email",
      label: "Почта",
      type: "email",
    },
    {
      id: "login",
      label: "Логин",
      type: "text",
    },
    {
      id: "first_name",
      label: "Имя",
      type: "text",
    },
    {
      id: "second_name",
      label: "Фамилия",
      type: "text",
    },
    {
      id: "phone",
      label: "Телефон",
      type: "tel",
    },
    {
      id: "password",
      label: "Пароль",
      type: "password",
    },
    {
      id: "password2",
      label: "Пароль (ещё раз)",
      type: "password",
    },
  ]
}

export const AUTHORIZATION_FORM = {
  logIn : {
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
  }
}
