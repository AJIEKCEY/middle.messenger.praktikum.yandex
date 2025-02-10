import Component from "../../core/Component/component.ts";
import template from "./profile.tpl.ts";

import "./profile.css"
import ProfileApi from "./profileApi.ts";
import Link from "../../components/Atomics/Link/Link.ts";
import {CHANGEPASSWORD_FORM, CHANGEUSERDATA_FORM} from "../../utils/formsDescription.ts";
import FormControl from "../../components/Molecules/FormControl/FormControl.ts";
import Form from "../../components/Molecules/Form/Form.ts";
import Input from "../../components/Atomics/Input/Input.ts";
import Avatar from "../../components/Organisms/Avatar/Avatar.ts";

import Router from "../../core/Router/Router.ts";
import Store from "../../core/Store";

const router = new Router()

export default class Profile extends Component{

  protected userData:{[key:string]:string} = {};
  private profileApi: ProfileApi = new ProfileApi();
  private form = new Form();

  constructor() {
    super();

    (async () => {
      await this.initProfileComponent();
    }) ();
  }

  // Fetch user data
  private async fetchUserData() {
    return this.profileApi.getUserData();
  }

  // Initialize profile component state
  private async initProfileComponent() {
    this.userData = await this.fetchUserData();

    this.setProps({
      userData: this.userData,
      currentView: "view",
      Avatar: new Avatar({ avatar: this.userData?.avatar, attr: { class: "avatar" } }),
      AvatarInput: this.avatarInput,
      EditData: this.editDataLink,
      GoBack: this.goToSettingsLink,
      ChangePassword: this.changePasswordLink,
    });

    if (Store?.events) {
        Store.events.on("userProfile", this.updateProfileData.bind(this));
        Store.events.on("newPassword", this.updatePassword.bind(this));
    }

  }

  // Update user profile data after form submission
  private updateProfileData() {
    if (Store?.state?.userProfile){
      this.profileApi
        .sendUserProfile(Store?.state?.userProfile)
        .then(() => this._updateProfileComponentState());
    }

  }

  // Update user password after form submission
  private updatePassword() {
    if (Store?.state?.userProfile) {
      this.profileApi
        .sendNewPassword(Store.state.newPassword)
        .then(() => this._updateProfileComponentState());
    }
  }

  private async _updateProfileComponentState() {
    await this.initProfileComponent();
  }

  // Reusable method to generate form controls
  private generateFormControls(formFields: { [key: string]: any }) {
    return Object.keys(formFields).map(
      (field) => new FormControl({ ...formFields[field], value: this.userData[field] })
    );
  }

  // Event handler for editing user data
  private onEditDataClick(e: Event) {
    e.stopPropagation();
    const controls = this.generateFormControls(CHANGEUSERDATA_FORM);
    this.form.setProps({ controls });
    this.setProps({ currentView: "edit", Form: this.form });
  }

  // Event handler for changing user password
  private onChangePasswordClick(e: Event) {
    e.stopPropagation();
    const controls = this.generateFormControls(CHANGEPASSWORD_FORM);
    this.form.setProps({ controls });
    this.setProps({ currentView: "password", Form: this.form });
  }

  // Links and input elements
  private editDataLink = new Link({
    title: "Изменить данные",
    href: "javascript:void(0);",
    events: {
      click: this.onEditDataClick.bind(this),
    },
  });

  private changePasswordLink = new Link({
    title: "Изменить пароль",
    href: "javascript:void(0);",
    events: {
      click: this.onChangePasswordClick.bind(this),
    },
  });

  private avatarInput = new Input({
    id: "avatar",
    type: "file",
    name: "avatar",
    events: {
      change: (e: Event) => {
        e.stopPropagation();
        const fileInput = e.target as HTMLInputElement;
        const files = fileInput.files;
        if (files && files.length > 0) {
          const formData = new FormData();
          formData.append("avatar", files[0], files[0].name);
          this.profileApi.sendAvatar(formData).then(() => this._updateProfileComponentState());
        } else {
          console.error("File not found");
        }
      },
    },
  });

  private goToSettingsLink = new Link({
    title: "Назад",
    href: "javascript:void(0);",
    events: {
      click: () => router.back(),
    },
  });


  override render(): void {
    this.compile(template, this._props);
  }
}
