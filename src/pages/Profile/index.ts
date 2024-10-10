import Profile from "./Profile.ts";
import Link from "../../components/Atomics/Link";
import Settings from "../Settings";
import Avatar from "../../components/Organisms/Avatar";
import Form from "../../components/Molecules/Form";
import {CHANGEPASSWORD_FORM, CHANGEUSERDATA_FORM} from "../../utils/formsDescription.ts";
import FormControl from "../../components/Molecules/FormControl";
import Input from "../../components/Atomics/Input";

export default (prop = {}) => {

  const userData:{[key:string]:string} = {
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

        const controls = [];
        for (const field in CHANGEUSERDATA_FORM){
          controls.push(FormControl({...CHANGEUSERDATA_FORM[field], value: userData[field] }));
        }

        form.setProps({controls})

        profile.setProps({currentView : 'edit', Form: form})
      },
    }
  });

  const form = Form()

  const changePasswordLink = Link({
    title: 'Изменить пароль',
    href: 'javascript:void(0);',
    events: {
      click: (e:Event) => {
        e.stopPropagation();

        const controls = [];
        for (const field in CHANGEPASSWORD_FORM){
          controls.push(FormControl({...CHANGEPASSWORD_FORM[field] }));
        }

        form.setProps({controls})

        profile.setProps({currentView : 'password',Form: form})
      },
    }
  });

  const inputFile = Input({
    id: 'avatar',
    type: 'file',
    name: 'avatar'
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


  const profile = new Profile({
    ...prop,
    userData,
    currentView : 'view',
    Avatar: Avatar(),
    InputFile: inputFile,
    EditData: editDataLink,
    GoBack: goToSettingsLink,
    ChangePassword: changePasswordLink,
  })

  return profile;
};
