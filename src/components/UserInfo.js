

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
    document.querySelector('.profile__avatar').style.backgroundImage = 'url('+avatar+')'
  }
}
