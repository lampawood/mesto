import { InitialCards } from './Cards';
import { Card } from './card.js'
import FormValidator from './FormValidator.js'
import { validationObj } from './FormValidator.js'


const popUpProfile = document.querySelector('#user')
const inputName = popUpProfile.querySelector('.pop-up__input_type_name')
const inputJob = popUpProfile.querySelector('.pop-up__input_type_about')
const popUp = document.querySelectorAll('.pop-up')
const popUpen = document.querySelector('.pop-up')
const popUpAddCard = document.querySelector('#add-card')
const closePop = document.querySelectorAll('.pop-up__close')
const popUpAddForm = popUpAddCard.querySelector('.pop-up__form')
const popUpProfileForm = popUpProfile.querySelector('.pop-up__form')
const popUpInput = popUpen.querySelector('.pop-up__input')
const buttonSave = popUpAddCard.querySelector('.pop-up__save')
const inputPlace = popUpAddCard.querySelector('.pop-up__card_title')
const inputPic = popUpAddCard.querySelector('.pop-up__card_link')
const proFile = document.querySelector('.profile')
const addButton = proFile.querySelector('.profile__add')
const editButton = proFile.querySelector('.profile__edit')
const avaName = proFile.querySelector('.profile__title')
const avaJob = proFile.querySelector('.profile__subtitle')
const formCardSpan = document.querySelectorAll('.form-input-error')
const cardForm = '#add-card'
const profileForm = '#user'
const cardValidator = new FormValidator(validationObj, cardForm)
const profileValidator = new FormValidator(validationObj, profileForm)


const windowReset = () => {
    const formReset = (form) => {
        form.reset();
        validation();
    };
    formCardSpan.forEach(span => {
            span.classList.remove('form-input-error_active')
        }
    );

    formReset(popUpProfileForm)
    inputName.value = avaName.textContent
    inputJob.value = avaJob.textContent
    popUpProfileForm.classList.remove('form-input-error_active')
    popUpInput.classList.remove('form-input-type_error')


    if (popUpAddForm) {
        validation();
        formReset(popUpAddForm)
        inputPic.classList.remove('form-input-type_error')
        inputPlace.classList.remove('form-input-type_error')

    }
}

export const togglePopUp = (popupWindow) => {

    popupWindow.classList.toggle('pop-up__opened');
    windowReset(popUp, avaName, avaJob, inputName, inputJob, inputPlace, inputPic, /* formCard */);

    if(popupWindow.classList.contains('pop-up__opened')){
        document.addEventListener('keydown', closeByEscape)
    }
}
const closeByEscape = (event) =>{
    if (event.key === "Escape") {
        popUp.forEach(form => {
                form.classList.remove('pop-up__opened')
                document.removeEventListener('keydown', closeByEscape)
            })
        }
}
const updateProfile = (event) => {

    event.preventDefault()
    avaJob.textContent = inputJob.value
    avaName.textContent = inputName.value

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
    togglePopUp(popUpAddCard);
}

editButton.addEventListener('click', () => {
    togglePopUp(popUpProfile);

})

addButton.addEventListener('click', () => {
    togglePopUp(popUpAddCard);
})

popUp.forEach(element => {
    element.addEventListener('click', closeOverlay);
})

closePop.forEach(element => {
    element.addEventListener('click', (event) => {
        const closeEvent = event.target
        const close = closeEvent.closest('.pop-up');
        togglePopUp(close);

    })

})

popUpProfile.addEventListener('submit', updateProfile);

popUpAddCard.addEventListener('submit', addPlaceHandler);


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