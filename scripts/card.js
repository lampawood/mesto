import {Validate} from './validate.js'
export const popUpProfile = document.querySelector('#profile')
export const proFile = document.querySelector('.profile')
export const avaName = proFile.querySelector('.profile__title')
export const avaJob = proFile.querySelector('.profile__subtitle')
export const inputName = popUpProfile.querySelector('.pop-up__input_type_name')
export const inputJob = popUpProfile.querySelector('.pop-up__input_type_about')
export let nameValue
export let jobValue

export class Card {
    constructor(data, cardTemplate) {
        this._name = data.name,
            this._link = data.link,
            this._temp = cardTemplate
    }

    _getTemplate = () => {
        const cardElement = document.querySelector(this._temp)
            .content
            .querySelector('.card')
            .cloneNode(true);

        this._element = cardElement;
    }

    static _windowReset = (popupWindow, avaNameValue, avaJobValue) => {
        const popUpProfile = document.querySelector('#profile')
        const form = popupWindow.querySelector('pop-up__form')
        const input = Array.from(popupWindow.querySelectorAll('.pop-up__input'))
        const button = popUpProfile.querySelector('.pop-up__save')

        if (avaNameValue) {
            avaName.textContent = avaNameValue
            avaJob.textContent = avaJobValue
            inputJob.value = avaJobValue
            inputName.value = avaNameValue

        } else {
            if ((popupWindow.id === 'add-card') || (popupWindow.id === 'profile'))
                popupWindow.querySelector('.pop-up__form').reset();
        }

        input.forEach(el => {
            FormValidator.hideInputError(form, el)
        })
        FormValidator.toggleButtonState(input, button)
    }

    static togglePopUp = (popupWindow) => {

        popupWindow.classList.toggle('pop-up__opened');
        Card._windowReset(popupWindow, nameValue, jobValue);
    }


    _clickTrash = () => {
        const trashTarget = this._element
        const cardToRemove = trashTarget.closest('.card');
        cardToRemove.querySelector('.card__item').removeEventListener('click', this._clickPic)
        cardToRemove.querySelector('.card__like').removeEventListener('click', this._clickLike)
        cardToRemove.querySelector('.card__delete').removeEventListener('click', this._clickTrash)
        cardToRemove.remove();
    }

    _openPopBig = (pic, place, popup) => {
        const popupBigImg = document.querySelector('#pop-up-full-image')
        const popUpBigPic = popupBigImg.querySelector('.pop-up-full-image__image')
        const popUpBigText = popupBigImg.querySelector('.pop-up-full-image__title')
        popUpBigPic.setAttribute('src', pic);
        popUpBigPic.setAttribute('alt', place);
        popUpBigPic.setAttribute('title', place);
        popUpBigText.textContent = place
        Card.togglePopUp(popup);
    }

    static updateProfile = (event) => {

        event.preventDefault()
        const popName = inputName.value
        const popJob = inputJob.value
        avaJob.textContent = popJob
        avaJob.setAttribute('title', popJob);
        avaName.textContent = popName
        avaName.setAttribute('title', popName);
        nameValue = avaName.textContent
        jobValue = avaJob.textContent
        Card.togglePopUp(popUpProfile);
    }


    _clickLike = () => {
        this._element.querySelector('.card__like').classList.toggle('card__like_liked')
    }

    _clickPic = () => {
        const targetPic = this._element
        const popupBigImg = document.querySelector('#pop-up-full-image')
        const picLink = targetPic.querySelector('.card__item').src;
        const placeCard = targetPic.closest('.card');
        const placeTitle = placeCard.querySelector('.card__title').textContent
        this._openPopBig(picLink, placeTitle, popupBigImg);
    }

    _setEventListeners = () => {

        this._element.querySelector('.card__delete').addEventListener('click', () => {
            this._clickTrash();
        });

        this._element.querySelector('.card__like').addEventListener('click', () => {
            this._clickLike();
        });

        this._element.querySelector('.card__item').addEventListener('click', () => {
            this._clickPic();
        });
    }

    addCard = () => {
        const place = document.querySelector('.elements')
        const card = this._generateCard();
        place.prepend(card);
    }

    _generateCard = () => {
        this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.card__title').textContent = this._name;
        const placesPic = this._element.querySelector('.card__item')
        placesPic.src = this._link;
        placesPic.alt = this._name;
        placesPic.title = this._name;
        return this._element;
    }

}