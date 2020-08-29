import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popup, imageInPopup, nameImageInPopup) {
    super(popup);
    this._imageInPopup = imageInPopup;
    this._nameInPopup = nameImageInPopup;
  }

  open(placeImage, placeName) {
    super.open()

    this._imageInPopup.src = placeImage.src
    this._imageInPopup.alt = placeImage.alt
    this._nameInPopup.textContent = placeName.textContent
  }
}
