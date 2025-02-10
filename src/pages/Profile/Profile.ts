import Component from "../../core/Component/component.ts";
import template from "./profile.tpl.ts";

import "./profile.css"
import profileApi from "./profileApi.ts";
import Link from "../../components/Atomics/Link/Link.ts";
import {CHANGEPASSWORD_FORM, CHANGEUSERDATA_FORM} from "../../utils/formsDescription.ts";
import FormControl from "../../components/Molecules/FormControl/FormControl.ts";
import Form from "../../components/Molecules/Form/Form.ts";
import Input from "../../components/Atomics/Input/Input.ts";
import Avatar from "../../components/Organisms/Avatar/Avatar.ts";

import Router from "../../core/Router/Router.ts";
//@ts-ignore
import Store from "../../core/Store";

const router = new Router()

export default class Profile extends Component{

  protected _userData:{[key:string]:string} = {};
  protected _profileApi;

  constructor() {
    super();

    this._profileApi = new profileApi();

    (async () => {
      await this.initProfileComponent();
    }) ();
  }

  async getUser(){
    return this._profileApi.getUserData()
  }

  async initProfileComponent(){
    this._userData = await this.getUser()

    this.setProps({
      userData: this._userData,
      currentView : 'view',
      Avatar: new Avatar({avatar: this._userData?.avatar, attr:{class:'avatar'}}),
      InputFile: this.inputFile,
      EditData: this.editDataLink,
      GoBack: this.goToSettingsLink,
      ChangePassword: this.changePasswordLink,
    })

    this._store.events.on('userProfile',this.changeUserProfileData.bind(this));
    this._store.events.on('newPassword',this.changePassword.bind(this));
  }

  changeUserProfileData(){
    this._profileApi.sendUserProfile(Store.state.userProfile)
      .then(() => {
        this.initProfileComponent();
      });
  }

  changePassword(){
    this._profileApi.sendNewPassword(Store.state.newPassword)
      .then(() => {
        this.initProfileComponent();
      });
  }

  form = new Form()

  editDataLink = new Link({
    title: 'Изменить данные',
    href: 'javascript:void(0);',
    events: {
      click: (e:Event) => {
        e.stopPropagation();

        const controls = [];
        for (const field in CHANGEUSERDATA_FORM){
          controls.push(new FormControl({...CHANGEUSERDATA_FORM[field], value: this._userData[field] }));
        }

        this.form.setProps({controls})

        this.setProps({currentView : 'edit', Form: this.form})
      },
    }
  });

  changePasswordLink = new Link({
    title: 'Изменить пароль',
    href: 'javascript:void(0);',
    events: {
      click: (e:Event) => {
        e.stopPropagation();

        const controls = [];
        for (const field in CHANGEPASSWORD_FORM){
          controls.push(new FormControl({...CHANGEPASSWORD_FORM[field] }));
        }

        this.form.setProps({controls})

        this.setProps({currentView : 'password',Form: this.form})
      },
    }
  });

  inputFile = new Input({
    id: 'avatar',
    type: 'file',
    name: 'avatar',
    events: {
      change: (e:Event) => {
        e.stopPropagation();
        const fileInput = e.target as HTMLInputElement;
        const files = fileInput.files;
        if(files && files.length > 0){
          const file = files[0]
          const formData = new FormData(); // Создаем объект FormData
          formData.append('avatar', file, file.name);
          this._profileApi.sendAvatar(formData)
            .then( () => {
              this.initProfileComponent();
            });
        } else {
          console.error('File not found');
        }
      },
    }
  })

  goToSettingsLink = new Link({
    title: 'Назад',
    href: 'javascript:void(0);',
    events: {
      click: (e:Event) => {
        e.stopPropagation();
        router.back();
      },
    }
  })

  override render(): void {
    this.compile(template, this._props);
  }
}
