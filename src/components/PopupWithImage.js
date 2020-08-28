import {Popup} from './Popup.js';
export class PopupWithImage extends Popup {
        constructor(popupSelector, { image, description }) {
            super(popupSelector);
            this._image = image;
            this._description = description;
        }

    open(img, description) {
        super.open();
        this._image.src = img
        this._description.textContent = description
        this._image.alt = description
    }
}