import {initialCards} from './cards.js';
import {popUpProfile, proFile, avaName, avaJob, inputName, inputJob} from './Card.js';
import {Card} from './card.js'
import {FormValidator} from './validate.js'

const popUp = document.querySelectorAll('.pop-up')
const popUpAddcard = document.querySelector('.pop-up_type_card')
const editButton = proFile.querySelector('.profile__edit')
const closePop = document.querySelectorAll('.pop-up__close')
const addButton = proFile.querySelector('.profile__add')
const popUpAddForm = popUpAddcard.querySelector('.pop-up__form')
const buttonSave = popUpAddcard.querySelector('.pop-up__save')
const inputPlace = popUpAddcard.querySelector('.pop-up__card_title')
const inputPic = popUpAddcard.querySelector('.pop-up__card_link')
let nameValue
let jobValue

export const windowReset = (popupWindow, avaNameValue, avaJobValue) => {
  const popUpProfile = document.querySelector('#user')
  const form = popupWindow.querySelector('.pop-up__form')
  const input = Array.from(popupWindow.querySelectorAll('.pop-up__input'))
  const button = popUpProfile.querySelector('.pop-up__save')

  if (avaNameValue) {
    avaName.textContent = avaNameValue
    avaJob.textContent = avaJobValue
    inputJob.value = avaJobValue
    inputName.value = avaNameValue

  } else {
    if ((popupWindow.id === 'add-card') || (popupWindow.id === 'user'))
      popupWindow.querySelector('.pop-up__form').reset();
  }

  input.forEach(el => {
    FormValidator.hideInputError(form, el)
  })
  FormValidator.toggleButtonState(input, button)
}

export const togglePopUp = (popupWindow) => {

  popupWindow.classList.toggle('pop-up__opened');
  windowReset(popupWindow, nameValue, jobValue);
}

const updateProfile = (event) => {

  event.preventDefault()
  const popName = inputName.value
  const popJob = inputJob.value
  avaJob.textContent = popJob
  avaJob.setAttribute('title', popJob);
  avaName.textContent = popName
  avaName.setAttribute('title', popName);
  nameValue = avaName.textContent
  jobValue = avaJob.textContent
  togglePopUp(popUpProfile);
}

const addCard = (generatedCard) => {
  const place = document.querySelector('.elements')
  const card = generatedCard;
  place.prepend(card);
}

const closeOverlay = (event) => {
  if (event.target !== event.currentTarget) {
    return
  }
  togglePopUp(event.target);
}

const addPlaceHandler = (event) => {
  event.preventDefault()
  const cardContext = {
    name: inputPlace.value,
    link: inputPic.value
  }

  const newCard = new Card(cardContext, '.template__card')._generateCard();
  addCard(newCard);
  popUpAddForm.reset();
  buttonSave.classList.add('pop-up__save_disabled')
  togglePopUp(popUpAddcard);
}

editButton.addEventListener('click', () => {
  togglePopUp(popUpProfile);
})

addButton.addEventListener('click', () => {
  togglePopUp(popUpAddcard);
})

popUp.forEach(element => {
  element.addEventListener('click', closeOverlay);
})

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 27) {
    popUp.forEach(form => {
      form.classList.remove('pop-up__opened')
    })
  }
})

closePop.forEach(element => {
  element.addEventListener('click', (event) => {
    const closeEvent = event.target
    const close = closeEvent.closest('.pop-up');
    togglePopUp(close);
  })
})

popUpProfile.addEventListener('submit', updateProfile);

popUpAddcard.addEventListener('submit', addPlaceHandler);

const renderCard = (array) => {
  array.forEach(element => {
    const newCard = new Card(element, '.template__card');
    addCard(newCard._generateCard());
  });
}
renderCard(initialCards);

const validationObj = {
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__save',
};

const validation = (validationObj) => {
  const newValidation = new FormValidator(validationObj, '.pop-up__form')
  newValidation.enableValidation()
}

validation(validationObj);