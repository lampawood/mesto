import {Section} from '../components/Section.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {Card} from '../components/Card.js'
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js'
import { initialCards } from '../Utils/Utils.js';
import { validationObj } from '../components/FormValidator.js';
import { popUpProfile, popUp, popUpAddcard, addButton, editButton, cardForm, profileForm, popupInfo, AddCard, CardTemplate, Elements, BigPopu} from '../Utils/constants.js'
import '../pages/index.css';

const cardValidator = new FormValidator(validationObj, cardForm)
const profileValidator = new FormValidator(validationObj, profileForm)


const cardsList = new Section({
    items: initialCards,
    renderer: (el) => {
        const newCard = new Card(el.name, el.link, CardTemplate,
            (link, name) => {
                popupWithImage.open(link, name)
            }
        );
        const cardElement = newCard.generateCard();
        cardsList.addItem(cardElement)
    },
}, Elements)
cardsList.renderItem();



const popupAdd = new PopupWithForm(AddCard, (placeObject) =>{
    const createdCard = new Card(placeObject.name, placeObject.link, CardTemplate, (image, description) => {
            popupWithImage.open(image, description);
        }
    ).generateCard();
    cardsList.addItem(createdCard);

})
popupAdd.setEventListeners()
addButton.addEventListener('click', () => {
    popupAdd.open();
    cardValidator.hideErrors(popUpAddcard);
})

const popupWithImage = new PopupWithImage(BigPopu, {
    image: document.querySelector('.pop-up-full-image__image'),
    description: document.querySelector('.pop-up-full-image__title')
});
const userInfo = new UserInfo (
    {
    name :document.querySelector('.profile__title'),
    job : document.querySelector('.profile__subtitle')
});
editButton.addEventListener('click', () => {
    popupEdit.open();
    userInfo.getUserInfo();
    profileValidator.hideErrors(popUpProfile, '.pop-up_type_user');
});
const popupEdit = new PopupWithForm(popupInfo, () => {
        userInfo.setUserInfo();
    }
);
popUp.forEach(element => {
    element.addEventListener('click', (event) => {
        if (event.target !== event.currentTarget) {
            return
        }
        element.classList.remove('pop-up__opened')
    });
})
popUpProfile.addEventListener('submit', (event) =>{
    if(event.key === "Enter"){
    event.preventDefault();
    userInfo.getUserInfo();
    popUpProfile.classList.remove('pop-up__opened')}
});
cardValidator.enableValidation()
profileValidator.enableValidation()