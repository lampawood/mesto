import { Section } from './Section.js'
import { PopupWithImage } from './PopupWithImage.js'
import { Card } from './Card.js'
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
import { FormValidator } from './FormValidator.js'
import { initialCards } from '../utils/utils.js';
import { validationObj } from './FormValidator.js';
import { popUpProfile, popUpAddcard, addButton, editButton, cardForm, profileForm, popupInfo, AddCard, CardTemplate, Elements, BigPopu} from '../utils/constants.js'
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
    cardValidator.resetButton();
})
const popupWithImage = new PopupWithImage(BigPopu, {
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
    userInfo.getUserInfo();
    profileValidator.hideErrors(popUpProfile, '.pop-up_type_user');
    profileValidator.resetButton()
});
const popupEdit = new PopupWithForm(popupInfo, () => {
        userInfo.setUserInfo();
    }
);
popupEdit.setEventListeners()
cardValidator.enableValidation()
profileValidator.enableValidation()