import { openPopUp } from './Utils.js'

const popupBigImg = document.querySelector('#pop-up-full-image')
const popUpBigPic = popupBigImg.querySelector('.pop-up-full-image__image')
const popUpBigText = popupBigImg.querySelector('.pop-up-full-image__title')


export class Card {
    constructor(data, cardTemplate) {
            this._name = data.name;
            this._link = data.link;
            this._temp = cardTemplate;

    }

    _getTemplate() {
        this._element = document.querySelector(this._temp)
            .content
            .querySelector('.card')
            .cloneNode(true);

        this._like = this._element.querySelector('.card__like');
        this._item = this._element.querySelector('.card__item');
        this._delete = this._element.querySelector('.card__delete');


        return this._element ;
    }

    _clickTrash() {
        this._item.removeEventListener('click', this._openPopBig)
        this._like.removeEventListener('click', this._clickLike)
        this._delete.removeEventListener('click', this._clickTrash)
        this._element.remove()
        this._element = null
    }

    _openPopBig() {
        const placeTitle = this._name;
        popUpBigPic.src = this._link;
        popUpBigPic.alt = this._name;
        popUpBigPic.title = this._name;
        popUpBigText.textContent = placeTitle;
        openPopUp(popupBigImg);
    }


    _clickLike() {
        this._like.classList.toggle('card__like_liked')
    }

    _setEventListeners = () => {

        this._delete.addEventListener('click', () => {
            this._clickTrash();
        });

        this._like.addEventListener('click', () => {
            this._clickLike();
        });

        this._item.addEventListener('click', () => {
            this._openPopBig();
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.card__title').textContent = this._name;
        const placesPic = this._item;
        placesPic.src = this._link;
        placesPic.alt = this._name;
        placesPic.title = this._name;
        return this._element;
    }
}