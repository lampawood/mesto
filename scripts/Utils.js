import {Card} from "./Card.js";
import {InitialCards} from "./Cards.js";
import {avaJob, avaName, inputName, inputJob, popUpProfile, popUpAddForm, popUpAddCard, inputPic, inputPlace, popUp, cardValidator, profileValidator, buttonSave, formCardSpan} from "./constants.js";


export const updateProfile = (event) => {
    event.preventDefault()
    avaJob.textContent = inputJob.value
    avaName.textContent = inputName.value

    closePopUp(popUpProfile);
}

const addCard = (generatedCard) => {
    const place = document.querySelector('.elements')
    place.prepend(generatedCard);
}

export const openPopUp =(popUpWindow)=>{
    popUpWindow.classList.add('pop-up__opened');
    document.addEventListener('keydown', closeByEscape);
}
export const formReset = (form) => {
    form.reset();
    validation();
    formCardSpan.forEach(span => {
        span.classList.remove('form-input-error_active')
    })

};
export  const closePopUp = (form) =>{
    form.classList.remove('pop-up__opened')
    document.removeEventListener('keydown', closeByEscape)
}

const closeByEscape = (event) =>{
    if (event.key === "Escape") {
        popUp.forEach(form => {
            form.classList.remove('pop-up__opened')
            document.removeEventListener('keydown', closeByEscape)

        })
    }
}

export const closeOverlay = (event) => {
    if (event.target !== event.currentTarget) {
        return
    }
    closePopUp(event.target);
}


export const addPlaceHandler = (event) => {
    event.preventDefault()
    const cardContext = {
        name: inputPlace.value,
        link: inputPic.value
    }

    const newCard = new Card(cardContext, '.template__card').generateCard();
    addCard(newCard);
    popUpAddForm.reset();
    buttonSave.classList.add('pop-up__save_disabled')
    closePopUp(popUpAddCard);
}

const renderCard = (array) => {
    array.forEach(element => {
        const newCard = new Card(element, '.template__card');
        addCard(newCard.generateCard());
    })
}
export const validation = () => {
    cardValidator.enableValidation()
    profileValidator.enableValidation()
}

validation();
renderCard(InitialCards);