import { togglePopUp } from './index.js'

const popupBigImg = document.querySelector('#pop-up-full-image')
const popUpBigPic = popupBigImg.querySelector('.pop-up-full-image__image')
const popUpBigText = popupBigImg.querySelector('.pop-up-full-image__title')


export class Card {
    constructor(data, cardTemplate) {
        this._name = data.name,
            this._link = data.link,
            this._like
            this._temp = cardTemplate
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._temp)
            .content
            .querySelector('.card')
            .cloneNode(true);

        return this._element = cardElement;
    }

    _clickTrash() {
        this._element.querySelector('.card__item').removeEventListener('click', this._openPopBig)
        this._element.querySelector('.card__like').removeEventListener('click', this._clickLike)
        this._element.querySelector('.card__delete').removeEventListener('click', this._clickTrash)
        this._element.remove()
        this._element = null
    }

    _openPopBig() {
        const placeTitle = this._element.querySelector('.card__title').textContent
        popUpBigPic.src = this._link;
        popUpBigPic.alt = this._name;
        popUpBigPic.title = this._name;
        popUpBigText.textContent = placeTitle
        togglePopUp(popupBigImg);
    }


    _clickLike() {
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

    generateCard() {
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