import {InitialCards} from './Сards.js';
import {Card} from './Card.js'
import FormValidator from './FormValidator.js'
import { validationObj } from './FormValidator.js'


const popUpProfile = document.querySelector('#user')
const inputName = popUpProfile.querySelector('.pop-up__input_type_name')
const inputJob = popUpProfile.querySelector('.pop-up__input_type_about')
const popUp = document.querySelectorAll('.pop-up')
const popUpAddcard = document.querySelector('#add-card')
const closePop = document.querySelectorAll('.pop-up__close')
const popUpAddForm = popUpAddcard.querySelector('.pop-up__form')
const buttonSave = popUpAddcard.querySelector('.pop-up__save')
const inputPlace = popUpAddcard.querySelector('.pop-up__card_title')
const inputPic = popUpAddcard.querySelector('.popup__card_link')
const proFile = document.querySelector('.profile')
const addButton = proFile.querySelector('.profile__add')
const editButton = proFile.querySelector('.profile__edit')
const avaName = proFile.querySelector('.profile__title')
const avaJob = proFile.querySelector('.profile__subtitle')
const cardForm = '#add-card'
const profileForm = '#user'
const cardValidator = new FormValidator(validationObj, cardForm)
const profileValidator = new FormValidator(validationObj, profileForm)
let nameValue
let jobValue

const windowReset = (popupWindow, avaNameValue, avaJobValue) => {
    const forms = popupWindow.querySelector('.pop-up__form')
    const input = Array.from(popupWindow.querySelectorAll('.pop-up__input'))
    const button = popUpProfile.querySelector('.pop-up__save')

    if (avaNameValue) {
        avaName.textContent = avaNameValue.value
        avaJob.textContent = avaJobValue.value

    } else {
        if (popupWindow.id === 'profile' || popupWindow.id === 'add-card')
            forms.reset();
    }
    formReset(forms, input, button);
}

const formReset = (forms, input, button) => {
    input.forEach(el => {
        const errorElement = forms.querySelector(`#${el.id}_error`);
        el.classList.remove('form__input-error');
        errorElement.classList.remove('form__input-error');
        errorElement.textContent = '';
        el.classList.contains('form__input_error') ?
            button.classList.add('pop-up__save_disabled') :
            button.classList.remove('pop-up__save_disabled')
    })
}

export const togglePopUp = (popupWindow) => {

    popupWindow.classList.toggle('pop-up__opened');
    windowReset(popupWindow, nameValue, jobValue);
}

const updateProfile = (event) => {

    event.preventDefault()
    avaJob.textContent = inputJob.value
    avaJob.setAttribute('title', inputJob.value);
    avaName.textContent = inputName.value
    avaName.setAttribute('title', inputName.value);
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

    const newCard = new Card(cardContext, '.template__card').generateCard();
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
    if (event.key === "Escape") {
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
        addCard(newCard.generateCard());
    })
}
renderCard(InitialCards);

const validation = () => {
    cardValidator.enableValidation()
    profileValidator.enableValidation()
}

validation();