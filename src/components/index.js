import { Section } from './Section.js'
import { PopupWithImage } from './PopupWithImage.js'
import { Card } from './Card.js'
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
import { FormValidator } from './FormValidator.js'
import { initialCards } from '../utils/utils.js';
import { popUpProfile, popUpAddcard, addButton, editButton, cardForm, profileForm, popupInfo, addCard, cardTemplate, elements, bigPopu, validationObj, nameInput, jobInput} from '../utils/constants.js'
import '../pages/index.css';

const cardValidator = new FormValidator(validationObj, cardForm)
const profileValidator = new FormValidator(validationObj, profileForm)

const placeCard = function (place) {
    const newPlaceCard = new Card (place.name, place.link, cardTemplate, (link, name) => {
        popupWithImage.open(link, name);
    })
    return newPlaceCard.generateCard()
}

const cardsList = new Section({
    items: initialCards,
    renderer: (el) => {
        cardsList.addItem(placeCard(el))
    },
}, elements)
cardsList.renderItem();

const popupAdd = new PopupWithForm(addCard, (placeObject) =>{
    cardsList.addItem(placeCard(placeObject));

})

popupAdd.setEventListeners()
addButton.addEventListener('click', () => {
    popupAdd.open();
    cardValidator.hideErrors(popUpAddcard);
    cardValidator.resetButton(false);
})

const popupWithImage = new PopupWithImage(bigPopu, {
    image: document.querySelector('.pop-up-full-image__image'),
    description: document.querySelector('.pop-up-full-image__title')
});

popupWithImage.setEventListeners();

const userInfo = new UserInfo (
    {
        name: document.querySelector('.profile__title'),
        job: document.querySelector('.profile__subtitle')
    });

editButton.addEventListener('click', () => {
    popupEdit.open();
    const user = userInfo.getUserInfo();
    nameInput.value = user.name
    jobInput.value = user.job
    profileValidator.hideErrors(popUpProfile, '.pop-up_type_user');
});

const popupEdit = new PopupWithForm(popupInfo, () => {
        userInfo.setUserInfo({
            name: nameInput.value,
            job: jobInput.value
        });
    }
);

popupEdit.setEventListeners()
cardValidator.enableValidation()
profileValidator.enableValidation()
cardValidator.hideErrors(popUpAddcard);