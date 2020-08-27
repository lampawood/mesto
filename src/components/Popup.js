export class Popup {
    constructor(popupSelector) {
        this._selector = popupSelector;
    }
    open() {
        this._selector.classList.add('pop-up__opened')
        document.addEventListener('keydown', this._handleEscClose);
    }
    close() {
        this._selector.classList.remove('pop-up__opened')
        this._selector.removeEventListener('keydown', this._handleEscClose)

    }
    _handleEscClose = (event) => {
        if (event.key === 'Escape') {
                this.close();
            }

    }
    setEventListeners() {
        const closePop = this._selector.querySelector('.pop-up__close')
        closePop.addEventListener('click', () => {
            this.close();
        })
        this._selector.addEventListener('click', (event) => {
            if (event.target !== event.currentTarget) {
                return
            }
            this.close();
        });
    }
}