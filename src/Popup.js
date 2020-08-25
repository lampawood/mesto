export class Popup {
    constructor(popupSelector) {
        this._selector = popupSelector;
    }
    open() {
        this._selector.classList.add('pop-up__opened')
        this._handleEscClose();
        this.setEventListeners();
    }
    close() {
        this._selector.classList.remove('pop-up__opened')
        this._selector.removeEventListener('keydown', this._handleEscClose)
    }
    _handleEscClose() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.close();
            }
        })
    }
    setEventListeners() {
        const closePop = this._selector.querySelector('.pop-up__close')
        closePop.addEventListener('click', () => {
            this.close();
        })
    }
}