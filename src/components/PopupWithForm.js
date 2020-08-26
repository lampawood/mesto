import {Popup} from "../src/Popup.js";

export class PopupWithForm extends Popup{
    constructor (popupSelector, submitAction ) {
        super(popupSelector);
        this._submitAction = submitAction;
        this._form = this._selector.querySelector('.pop-up__form');
    }

    _getInputValues() {
        this._inputList = this._selector.querySelectorAll('.pop-up__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {

        super.setEventListeners();
        this._form.addEventListener('submit', (ev) => {
            const button = this._form.querySelector('.pop-up__save');
            if(button.classList.contains('pop-up__save_disabled')){
                return false
            } else {
            ev.preventDefault();
            this._submitAction(this._getInputValues());
            this.close();}
        })
    }

    close()
{
    super.close();
    this._form.reset();
}
}