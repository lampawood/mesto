
import {togglePopUp} from './index.js'
export const popUpProfile = document.querySelector('#user')
export const proFile = document.querySelector('.profile')
export const avaName = proFile.querySelector('.profile__title')
export const avaJob = proFile.querySelector('.profile__subtitle')
export const inputName = popUpProfile.querySelector('.pop-up__input_type_name')
export const inputJob = popUpProfile.querySelector('.pop-up__input_type_about')


export  class Card {
    constructor(data, cardTemplate) {
            this._name = data.name,
            this._link = data.link,
            this._temp = cardTemplate
    }

    _getTemplate = () => {
        const cardElement = document
        .querySelector(this._temp)
        .content
        .querySelector('.card')
        .cloneNode(true);

        this._element = cardElement;
    }

    _clickTrash = () => {
        const trashTarget = this._element
        const cardToRemove = trashTarget.closest('.card');
        cardToRemove.querySelector('.card__item').removeEventListener('click', this._openPopBig)
        cardToRemove.querySelector('.card__like').removeEventListener('click', this._clickLike)
        cardToRemove.querySelector('.card__delete').removeEventListener('click', this._clickTrash)
        cardToRemove.remove();
    }

    _openPopBig = () => {
        const targetPic = this._element
        const picLink = targetPic.querySelector('.card__item').src;
        const placeCard = targetPic.closest('.card');
        const placeTitle = placeCard.querySelector('.card__title').textContent
        const popupBigImg = document.querySelector('#pop-up-full-image')
        const popUpBigPic = popupBigImg.querySelector('.pop-up-full-image__image')
        const popUpBigText = popupBigImg.querySelector('.pop-up-full-image__title')
        popUpBigPic.setAttribute('src', picLink);
        popUpBigPic.setAttribute('alt', placeTitle);
        popUpBigPic.setAttribute('title', placeTitle);
        popUpBigText.textContent = placeTitle
        togglePopUp(popupBigImg);
    }


    _clickLike = () => {
        this._element.querySelector('.card__like').classList.toggle('card__like_liked')
    }

    _setEventListeners = () => {

        this._element.querySelector('.card__delete').addEventListener('click', () => {
            this._clickTrash();
        });

        this._element.querySelector('.card__like').addEventListener('click', () => {
            this._clickLike();
        });

        this._element.querySelector('.card__item').addEventListener('click', () => {
            this._openPopBig();
        });
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