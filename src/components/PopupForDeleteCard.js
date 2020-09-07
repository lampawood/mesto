import Popup from './Popup.js'

export default class PopupForDeleteCard extends Popup {
  constructor(popup, api) {
    super(popup);
    this._api = api;
  }

  setEventListeners(cardId, evt) {
    super.setEventListeners()
    const okButton = this._popup.querySelector('.popup__button')
    okButton.addEventListener('click', () => {
      this._deleteClickHandler(cardId, evt)
    })
  }

  _deleteClickHandler(cardId, evt) {
    this._card = evt.target.parentElement
    this._api.deleteCard(cardId)
      .then(res => {
        console.log(this._card)
        this._card.remove()
        this.close()
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

}
