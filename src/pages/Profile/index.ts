import Profile from "./Profile.ts";
import Link from "../../components/Atomics/Link";
import Button from "../../components/Atomics/Button";
import Settings from "../Settings";
import Avatar from "../../components/Organisms/Avatar";

export default (prop = {}) => {

  const userData = {
    email: "pochta@yandex.ru",
    login: "ivanivanov",
    first_name: "Иван",
    second_name: "Иванов",
    display_name: "Иван",
    phone: "+7 (909) 967 30 30"
  }

  const editDataLink = Link({
    title: 'Изменить данные',
    href: 'javascript:void(0);',
    events: {
      click: (e:Event) => {
        e.stopPropagation();
        profile.setProps({currentView : 'edit'})
      },
    }
  });

  const changePasswordLink = Link({
    title: 'Изменить пароль',
    href: 'javascript:void(0);',
    events: {
      click: (e:Event) => {
        e.stopPropagation();
        profile.setProps({currentView : 'password'})
      },
    }
  });

  const saveButton = Button({
    name: 'Сохранить',
    events: {
      click: (e:Event) => {
        e.stopPropagation();
        //const formData = new FormData(event?.target.closest('form'));
        //console.log(formData);

        setTimeout(function (){
          profile.setProps({currentView : 'view'})
        },7000)
      },
    }
  })

  const goToSettingsLink = Link({
    title: 'Вернуться в настройки',
    href: 'javascript:void(0);',
    events: {
      click: (e:Event) => {
        e.stopPropagation();
        window.app.setProps({currentPage: Settings()})
      },
    }
  })

  const goToSettingsButton = Button({
    name: '<',
    events: {
      click: (e:Event) => {
        e.stopPropagation();
        window.app.setProps({currentPage: Settings()})
      },
    }
  })

  const profile = new Profile({
    ...prop,
    userData,
    currentView : 'view',
    Avatar: Avatar(),
    EditData: editDataLink,
    GoBack: goToSettingsLink,
    BackButton: goToSettingsButton,
    ChangePassword: changePasswordLink,
    SaveButton: saveButton,
  })

  return profile;
};
