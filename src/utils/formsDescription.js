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
      id: "firstName",
      label: "Имя",
      type: "text",
    },
    {
      id: "lasName",
      label: "Фамилия",
      type: "text",
    },
    {
      id: "phoneNumber",
      label: "Телефон",
      type: "tel",
    },
    {
      id: "password1",
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
  formName: "Вход",
  buttonLabel: "Авторизоваться",
  linkLabel: "Нет аккаунта?",
  fields: [
    {
      id: "login",
      label: "Логин",
      type: "text",
    },
    {
      id: "password",
      label: "Пароль",
      type: "password",
    },
  ]
}
