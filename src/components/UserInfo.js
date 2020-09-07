import{ popupAvatar } from "../utils/constants";

export default class UserInfo {
  constructor(config, { name, description, avatar}) {
    this._config = config;
    this._name = name;
    this._description = description;
    this._avatar = avatar;
    this._userName = '';
    this._userAbout = '';
    this._userAvatar = '';
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent
    }
  }

  setUserInfo( data ) {
    this._config.myId = data._id;
    this._userName = data.name;
    this._userAbout = data.about;
    this._updateUserInfo();
  }

  setAvatar(data) {
    this._userAvatar = data.avatar;
    this._updateAvatar();
  }
  _updateUserInfo(){
    this._name.textContent = this._userName
    this._description.textContent = this._userAbout
  }
  _updateAvatar(){
  this._avatar.style.background = `url(${this._userAvatar})`;
}
}
