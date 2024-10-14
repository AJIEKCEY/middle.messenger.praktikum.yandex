import serialize from "./baseUtil.ts";
import {ComponentProps} from "../core/types.ts";
import {VALIDATION_MESSAGES, VALIDATION_RULES} from "./validation.ts";

// TODO this в обработчиках будет связываться (bind) с контекстом компонента.
//  Как этот момент разрешить в TS я пока не разобрался.

const phoneControlDescription = {
  label: 'Телефон',
  id: 'phone',
  tag: 'input',
  type: 'tel',
  name: 'phone',
  placeholder: 'Введите номер телефона',
  hasError: false,
  validationMessage: VALIDATION_MESSAGES.phone,
  events: {
    blur: function () {
      //@ts-expect-error    this будет связываться (bind) с контекстом компонента
      const input: HTMLInputElement = this.getContent() as HTMLInputElement;
      const regex: RegExp = VALIDATION_RULES.phone
      const valid = regex.test(input.value)

      //@ts-expect-error    this будет связываться (bind) с контекстом компонента
      this.setProps({
        value: input.value,
        hasError: !valid,
      });
    }
  }
};

const displayNameControlDescription = {
  label: 'Отображаемое имя',
  id: 'display_name',
  tag: 'input',
  type: 'text',
  name: 'display_name',
  placeholder: 'Введите отображаемое имя',
  hasError: false,
  validationMessage: VALIDATION_MESSAGES.display_name,
  events: {
    blur: function () {
      //@ts-expect-error    this будет связываться (bind) с контекстом компонента
      const input: HTMLInputElement = this.getContent() as HTMLInputElement;
      const regex: RegExp = VALIDATION_RULES.display_name;
      const valid = regex.test(input.value);

      //@ts-expect-error    this будет связываться (bind) с контекстом компонента
      this.setProps({
        value: input.value,
        hasError: !valid,
      });
    }
  }
};

const passwordControlDescription = {
  label: 'Пароль',
  id: 'password',
  tag: 'input',
  type: 'password',
  name: 'password',
  placeholder: 'Введите пароль',
  hasError: false,
  validationMessage: VALIDATION_MESSAGES.password,
  events: {
    blur: function () {
      //@ts-expect-error    this будет связываться (bind) с контекстом компонента
      const input: HTMLInputElement = this.getContent() as HTMLInputElement;
      const regex: RegExp = VALIDATION_RULES.password;
      const valid = regex.test(input.value);

      //@ts-expect-error    this будет связываться (bind) с контекстом компонента
      this.setProps({
        value: input.value,
        hasError: !valid,
      });
    }
  }
};

const loginControlDescription = {
  label: 'Логин',
  id: 'login',
  tag: 'input',
  type: 'text',
  name: 'login',
  placeholder: 'Введите логин',
  hasError: false,
  validationMessage: VALIDATION_MESSAGES.login,
  events: {
    blur: function () {
      //@ts-expect-error    this будет связываться (bind) с контекстом компонента
      const input: HTMLInputElement = this.getContent() as HTMLInputElement;
      const regex: RegExp = VALIDATION_RULES.login;
      const valid = regex.test(input.value);

      //@ts-expect-error    this будет связываться (bind) с контекстом компонента
      this.setProps({
        value: input.value,
        hasError: !valid,
      });
    }
  }
};

const emailControlDescription = {
  label: 'Почта',
  id: 'email',
  tag: 'input',
  type: 'email',
  name: 'email',
  placeholder: 'Введите почту',
  hasError: false,
  validationMessage: VALIDATION_MESSAGES.email,
  events: {
    blur: (function () {
      //@ts-expect-error    this будет связываться (bind) с контекстом компонента
      const input: HTMLInputElement = this.getContent() as HTMLInputElement;
      const regex: RegExp = VALIDATION_RULES.email;
      const valid = regex.test(input.value);
      //@ts-expect-error    this будет связываться (bind) с контекстом компонента
      this.setProps({
        value: input.value,
        hasError: !valid,
      });
    })
  }
};

const firstNameControlDescription = {
  label: 'Имя',
  id: 'first_name',
  tag: 'input',
  type: 'text',
  name: 'first_name',
  placeholder: 'Введите имя',
  hasError: false,
  validationMessage: VALIDATION_MESSAGES.first_name,
  events: {
    blur: function () {
      //@ts-expect-error    this будет связываться (bind) с контекстом компонента
      const input: HTMLInputElement = this.getContent() as HTMLInputElement;
      const regex: RegExp = VALIDATION_RULES.first_name;
      const valid = regex.test(input.value);

      //@ts-expect-error    this будет связываться (bind) с контекстом компонента
      this.setProps({
        value: input.value,
        hasError: !valid,
      });
    }
  }
};

const secondNameControlDescription = {
  label: 'Фамилия',
  id: 'second_name',
  tag: 'input',
  type: 'text',
  name: 'second_name',
  placeholder: 'Введите фамилию',
  hasError: false,
  validationMessage: VALIDATION_MESSAGES.second_name,
  events: {
    blur: function () {
      //@ts-expect-error    this будет связываться (bind) с контекстом компонента
      const input: HTMLInputElement = this.getContent() as HTMLInputElement;
      const regex: RegExp = VALIDATION_RULES.second_name;
      const valid = regex.test(input.value);

      //@ts-expect-error    this будет связываться (bind) с контекстом компонента
      this.setProps({
        value: input.value,
        hasError: !valid,
      });
    }
  }
};

export const REGISTRATION_FORM: { [key: string]: ComponentProps } = {
  email: emailControlDescription,
  login: loginControlDescription,
  first_name: firstNameControlDescription,
  second_name: secondNameControlDescription,
  display_name: displayNameControlDescription,
  phone: phoneControlDescription,
  password: passwordControlDescription,
  password2: {
    label: 'Пароль (ещё раз)',
    id: 'password2',
    tag: 'input',
    type: 'password',
    name: 'password2',
    placeholder: 'Введите пароль еще раз',
    hasError: false,
    validationMessage: VALIDATION_MESSAGES.password_confirm,
    events: {
      blur: function () {
        //@ts-expect-error    this будет связываться (bind) с контекстом компонента
        const input: HTMLInputElement = this.getContent() as HTMLInputElement;
        const regex: RegExp = VALIDATION_RULES.password_confirm;
        const passwordValue = input.form?.password?.value;
        const valid = regex.test(input.value) && input.value === passwordValue

        //@ts-expect-error    this будет связываться (bind) с контекстом компонента
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
    events: {
      click: function (e: Event) {
        e.preventDefault();
        e.stopPropagation();

        //@ts-expect-error    this будет связываться (bind) с контекстом компонента
        const formEl = e.target?.form;
        const formElements = formEl.querySelectorAll('input');
        let valid = true;
        formElements.forEach((element: HTMLInputElement) => {
          if (element.value.length === 0)
            element.classList.add('warning');
          if (element.classList.contains('warning')) {
            valid = false
          }
        })

        if (valid) {
          const formData = new FormData(formEl)
          console.log(serialize(formData));
        }
      }
    }
  }
}

export const AUTHORIZATION_FORM: {[key: string]: ComponentProps} = {
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
        //@ts-expect-error    this будет связываться (bind) с контекстом компонента
        const input: HTMLInputElement = this.getContent() as HTMLInputElement;
        const regex: RegExp = /^(?=.*[a-zA-Z])[-\w]{3,20}$/;
        const valid = regex.test(input.value) || input.value.length > 0

        //@ts-expect-error    this будет связываться (bind) с контекстом компонента
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
        //@ts-expect-error    this будет связываться (bind) с контекстом компонента
        const input: HTMLInputElement = this.getContent() as HTMLInputElement;
        const valid = input.value.length > 0

        //@ts-expect-error    this будет связываться (bind) с контекстом компонента
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
    events: {
      click: function (e: Event) {
        e.preventDefault();
        e.stopPropagation();

        //@ts-expect-error     this будет связываться (bind) с контекстом компонента
        const formEl = e.target?.form;
        const formElements = formEl.querySelectorAll('input');
        let valid = true;
        formElements.forEach((element: HTMLInputElement) => {
          if (element.value.length === 0)
            element.classList.add('warning');
          if (element.classList.contains('warning')) {
            valid = false
          }
        })

        if (valid) {
          const formData = new FormData(formEl)
          console.log(serialize(formData));
        }
      }
    }
  }
}

export const CHANGEPASSWORD_FORM: { [key: string]: ComponentProps } = {
  password: {
    label: 'Старый пароль',
    id: 'password',
    tag: 'input',
    type: 'password',
    name: 'password',
    placeholder: 'Введите пароль',
    hasError: false,
    validationMessage: 'Введите пароль',
    events: {
      blur: function () {
        //@ts-expect-error    this будет связываться (bind) с контекстом компонента
        const input: HTMLInputElement = this.getContent() as HTMLInputElement;
        const valid = input.value.length > 0

        //@ts-expect-error    this будет связываться (bind) с контекстом компонента
        this.setProps({
          value: input.value,
          hasError: !valid,
        });
      }
    }
  },
  passwordNew1: {
    label: 'Новый пароль',
    id: 'passwordNew1',
    tag: 'input',
    type: 'password',
    name: 'passwordNew1',
    placeholder: 'Введите пароль',
    hasError: false,
    validationMessage: VALIDATION_MESSAGES.password,
    events: {
      blur: function () {
        //@ts-expect-error    this будет связываться (bind) с контекстом компонента
        const input: HTMLInputElement = this.getContent() as HTMLInputElement;
        const regex: RegExp = VALIDATION_RULES.password;
        const valid = regex.test(input.value) || input.value.length > 0

        //@ts-expect-error    this будет связываться (bind) с контекстом компонента
        this.setProps({
          value: input.value,
          hasError: !valid,
        });
      }
    }
  },
  passwordNew2: {
    label: 'Повторите новый пароль',
    id: 'passwordNew2',
    tag: 'input',
    type: 'password',
    name: 'passwordNew2',
    placeholder: 'Введите пароль еще раз',
    hasError: false,
    validationMessage: VALIDATION_MESSAGES.password_confirm,
    events: {
      blur: function () {
        //@ts-expect-error    this будет связываться (bind) с контекстом компонента
        const input: HTMLInputElement = this.getContent() as HTMLInputElement;
        const regex: RegExp = VALIDATION_RULES.password_confirm;
        const valid = regex.test(input.value) || input.value.length > 0

        //@ts-expect-error    this будет связываться (bind) с контекстом компонента
        this.setProps({
          value: input.value,
          hasError: !valid,
        });
      }
    }
  },
  changePassBtn: {
    text: 'Сохранить',
    id: 'changePass__btn',
    tag: 'button',
    events: {
      click: function (e: Event) {
        e.preventDefault();
        e.stopPropagation();

        //@ts-expect-error    this будет связываться (bind) с контекстом компонента
        const formEl = e.target?.form;
        const formElements = formEl.querySelectorAll('input');
        let valid = true;
        formElements.forEach((element: HTMLInputElement) => {
          if (element.value.length === 0)
            element.classList.add('warning');
          if (element.classList.contains('warning')) {
            valid = false
          }
        })

        if (valid) {
          const formData = new FormData(formEl)
          console.log(serialize(formData));
        }
      }
    }
  }
}

export const CHANGEUSERDATA_FORM: { [key: string]: ComponentProps } = {
  email: emailControlDescription,
  login: loginControlDescription,
  first_name: firstNameControlDescription,
  second_name: secondNameControlDescription,
  display_name: displayNameControlDescription,
  phone: phoneControlDescription,
  changeUserDataBtn: {
    text: 'Сохранить',
    id: 'changeUserData__btn',
    tag: 'button',
    events: {
      click: function (e: Event) {
        e.preventDefault();
        e.stopPropagation();

        //@ts-expect-error    this будет связываться (bind) с контекстом компонента
        const formEl = e.target?.form;
        const formElements = formEl.querySelectorAll('input');
        let valid = true;
        formElements.forEach((element: HTMLInputElement) => {
          if (element.value.length === 0)
            element.classList.add('warning');
          if (element.classList.contains('warning')) {
            valid = false
          }
        })

        if (valid) {
          const formData = new FormData(formEl)
          console.log(serialize(formData));
        }
      }
    }
  }
}
