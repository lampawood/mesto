import{ popupAvatar } from "../utils/constants";

export default class UserInfo {
  constructor({ name, description }) {
    this._name = name;
    this._description = description;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent
    }
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name
    this._description.textContent = about
  }

  setAvatar(avatar) {
    popupAvatar.style.backgroundImage = 'url('+avatar+')'
  }
}
