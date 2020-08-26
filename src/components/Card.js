export class Card {
    constructor(name, link, cardTemplate, handleCardClick) {

        this._name = name;
        this._link = link;
        this._template = cardTemplate;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {

        const cardElement = this._template.content.cloneNode(true);
        return this._element = cardElement;

    }

    _clickTrash(evt) {
        evt.target.closest('.card').remove()
        this._element = null
    }

    _clickLike(evt) {

        evt.target.classList.toggle('card__like_liked')
    }

    _setEventListeners = (evt) => {

        this._element.querySelector('.card__delete').addEventListener('click', (evt) => {
            this._clickTrash(evt);
        });

        this._element.querySelector('.card__like').addEventListener('click', (evt) => {
            this._clickLike(evt);
        });

        this._element.querySelector('.card__item').addEventListener('click', () => {
            this._handleCardClick(this._link, this._name);
        });
    }
    generateCard () {

        this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.card__title').textContent = this._name;

        const placesPic = this._element.querySelector('.card__item');
        placesPic.src = this._link;
        placesPic.alt = this._name;
        return this._element;
    }
}
