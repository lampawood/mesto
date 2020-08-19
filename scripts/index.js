import {editButton, addButton, popUp, closePop, popUpProfile, popUpAddCard} from "./constants.js";
import {openPopUp, closeOverlay, closePopUp, updateProfile, addPlaceHandler} from "./Utils.js";

editButton.addEventListener('click', () => {
    openPopUp(popUpProfile);

})

addButton.addEventListener('click', () => {
    openPopUp(popUpAddCard);
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



