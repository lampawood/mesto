import {
    editButton,
    addButton,
    popUp,
    closePop,
    popUpProfile,
    popUpAddCard,
    popUpAddForm,
    inputPic, inputPlace, popUpProfileForm, inputName, avaName, inputJob, avaJob, popUpInput
} from "./constants.js";
import {openPopUp, closeOverlay, closePopUp, updateProfile, addPlaceHandler, formReset, validation} from "./Utils.js";


editButton.addEventListener('click', () => {
    openPopUp(popUpProfile);
    formReset(popUpProfileForm)
    inputName.value = avaName.textContent;
    inputJob.value = avaJob.textContent;
    popUpProfileForm.classList.remove('form-input-error_active')
    popUpInput.classList.remove('form-input-type_error')
})

addButton.addEventListener('click', () => {
    openPopUp(popUpAddCard);
    validation();
    formReset(popUpAddForm)
    inputPic.classList.remove('form-input-type_error');
    inputPlace.classList.remove('form-input-type_error');
})

popUp.forEach(element => {
    element.addEventListener('click', closeOverlay);
})

closePop.forEach(element => {
    element.addEventListener('click', (event) => {
        const closeEvent = event.target
        const close = closeEvent.closest('.pop-up');
        closePopUp(close);
    })

})

popUpProfile.addEventListener('submit', updateProfile);

popUpAddCard.addEventListener('submit', addPlaceHandler);




