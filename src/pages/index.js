import './index.css'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupForDeleteCard from '../components/PopupForDeleteCard.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'
import { setLoading } from '../utils/utils.js'
import { popupInfo, nameProfile, editButton, popupPlace, formInfo, addButton, formPlace, placeTemplate, placeList,
  settingsObject, popupDel, editAvatarButton, popupAvatar, formAvatar, submitButtonPlace, submitButtonInfo, submitButtonAvatar,
  descriptionProfile, popupImage, imageInPopup, nameImageInPopup, nameInput, descriptionInput, avatarProfile } from '../utils/constants.js'
import { config } from '../components/config.js'

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15',
  headers: {
    authorization: '529addb6-4b69-4a92-a5e5-18a2a45d6cf3',
    'Content-Type': 'application/json'
  }
})


Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([data, items]) => {
        user.setUserInfo(data);
        user.setAvatar(data);
        starterCards.renderItems(items);
    })
    .catch((err) => console.log(err));


// Изменение данных о пользователе
const handleUserInfo = function (userData) {
  setLoading(true, submitButtonInfo)
  api.patchUserInfo(userData.name, userData.description)
    .then((info) => {
      user.setUserInfo(info)
      infoPopup.close()
    })
    .catch((err) => {
      console.log(err) // выведем ошибку в консоль
    })
    .finally(() => {
      setLoading(false, submitButtonInfo)
    })
}

// Изменение аватарки
const handleAvatar = function (linkObject) {
  setLoading(true, submitButtonAvatar)
  api.patchAvatar(linkObject.avatar)
    .then((res) => {
      user.setAvatar(res)
      avatarPopup.close()
    })
    .catch((err) => {
      console.log(err) // выведем ошибку в консоль
    })
    .finally(() => {
      setLoading(false, submitButtonAvatar)
    })
}

// Добавление новой карточки на сервер
const addNewCard = function (card) {
  setLoading(true, submitButtonPlace)
  api.postNewCard(card.name, card.link)
    .then((card) => {
        placePopup.close()
      starterCards.addItem(card)
    })
    .catch((err) => {
      console.log(err) // выведем ошибку в консоль
    })
    .finally(() => {
      setLoading(false, submitButtonPlace)
    })
}

const popupWithImage = new PopupWithImage(popupImage, imageInPopup, nameImageInPopup)

const handleCardClick = function (placeImage, placeName) {
  popupWithImage.open(placeImage, placeName)
}

// Удаление карточки

const popupDelCard = new PopupForDeleteCard(popupDel, api)

const handleDeleteClick = function (cardId, evt) {
  popupDelCard.open()
  popupDelCard.setEventListeners(cardId, evt)
    console.log(cardId)
}

// создание карточки

const render = (place) => {
    const newPlaceCard = new Card (place, placeTemplate, handleCardClick, handleDeleteClick, api, config)
    return newPlaceCard.generateCard(place)

}
const user = new UserInfo(config, {
  name: nameProfile,
  description: descriptionProfile,
    avatar: avatarProfile,

})

// создадим экземпляры класса Popup для каждого попапа
const placePopup = new PopupWithForm(popupPlace, (place) => {
    addNewCard(place)
  })

const infoPopup = new PopupWithForm(popupInfo, handleUserInfo)

const avatarPopup = new PopupWithForm(popupAvatar, handleAvatar)




placePopup.setEventListeners()
infoPopup.setEventListeners()
avatarPopup.setEventListeners()


// Слушатели

editButton.addEventListener('click', () => {
  const userInfo = user.getUserInfo()
  nameInput.value = userInfo.name
  descriptionInput.value = userInfo.description
  infoPopup.open()
  infoFormValidator.hideError()
  infoFormValidator.resetButton()
})
addButton.addEventListener('click', () => {
  placePopup.open()
  placeFormValidator.hideError()
  placeFormValidator.resetButton()
})
editAvatarButton.addEventListener('click', () =>{
  avatarPopup.open()
  avatarFormValidator.hideError()
  avatarFormValidator.resetButton()
})

// Создадим два экземпляра класса FormValidator для двух форм

const placeFormValidator = new FormValidator (settingsObject, formPlace)
const infoFormValidator = new FormValidator(settingsObject, formInfo)
const avatarFormValidator = new FormValidator(settingsObject, formAvatar)

// Отрисовка карточек


const starterCards = new Section(
    render,
    placeList
);



popupWithImage.setEventListeners()
placeFormValidator.enableValidation()
infoFormValidator.enableValidation()
avatarFormValidator.enableValidation()
