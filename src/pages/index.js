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
  descriptionProfile, popupImage, imageInPopup, nameImageInPopup, nameInput, descriptionInput } from '../utils/constants.js'

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: 'a03634a6-2812-4eb8-85e6-1ba9020a3381',
    'Content-Type': 'application/json'
  }
})


const firstPromise = new Promise((resolve, reject) => {
    resolve(api.getInitialCards())
});

const secondPromise = new Promise((resolve, reject) => {
    resolve(api.getUserInfo())
});

const arrayPromise = [firstPromise, secondPromise]

Promise.all(arrayPromise)
    .then(([cards, data]) => {
        api.userInfo = data
        user.setAvatar(data.avatar)
        user.setUserInfo({ name: data.name, about: data.about })
        //user.setAvatar(data.avatar)
        renderCards(cards).renderItems()

        }
    )


// Изменение данных о пользователе
const handleUserInfo = function (userData) {
  setLoading(true, submitButtonInfo)
  api.patchUserInfo(userData.name, userData.about)
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
      user.setAvatar(res.avatar)
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
      renderCards().addNewCard(createPlaceCard(card))
      placePopup.close()
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
  popupWithImage.setEventListeners()
}

// Удаление карточки

const popupDelCard = new PopupForDeleteCard(popupDel, api)

const handleDeleteClick = function (cardId) {
  popupDelCard.open()
  popupDelCard.setEventListeners(cardId)
}

// создание карточки

const createPlaceCard = function (place) {
  const newPlaceCard = new Card (place, placeTemplate, handleCardClick, api.userInfo._id, handleDeleteClick, api)
  return newPlaceCard.generateCard()
}

// Отрисовка карточек
const renderCards = function (cards) {
  const cardsList = new Section({
      items: cards,
      renderer: (place) => {
        cardsList.addItem(createPlaceCard(place))
      },
    },
    placeList
  )
  return cardsList
}

const user = new UserInfo({
  name: nameProfile,
  description: descriptionProfile
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
const rendererCards = new renderCards();


popupWithImage.setEventListeners()
placeFormValidator.enableValidation()
infoFormValidator.enableValidation()
avatarFormValidator.enableValidation()
