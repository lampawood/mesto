import {Card} from "./Card.js";
import {InitialCards} from "./Cards.js";
import {avaJob, avaName, inputName, inputJob, popUpProfile, formCardSpan, popUpProfileForm, popUpInput, popUpAddForm, popUpAddCard, inputPic, inputPlace, popUp, cardValidator, profileValidator, buttonSave} from "./constants.js";


export const updateProfile = (event) => {
    event.preventDefault()
    avaJob.textContent = inputJob.value
    avaName.textContent = inputName.value

    closePopUp(popUpProfile);
}

const addCard = (generatedCard) => {
    const place = document.querySelector('.elements')
    const card = generatedCard;
    place.prepend(card);
}

export const openPopUp =(popUpWindow)=>{
    popUpWindow.classList.add('pop-up__opened');
    document.addEventListener('keydown', closeByEscape);

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
const validation = () => {
    cardValidator.enableValidation()
    profileValidator.enableValidation()
}

validation();
renderCard(InitialCards);