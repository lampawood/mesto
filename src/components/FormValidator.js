export default class FormValidator {
  constructor(settingsObject, formElement) {
    this._formElement = formElement;
    this._inputSelector = settingsObject.inputSelector;
    this._submitButtonSelector = settingsObject.submitButtonSelector;
    this._inactiveButtonClass = settingsObject.inactiveButtonClass;
    this._inputErrorClass = settingsObject.inputErrorClass;
    this._errorClass = settingsObject.errorClass;
    this._errorSelector = settingsObject.errorSelector;
    this._infoButton = settingsObject.infoButton;
  }

  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.add(this._inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(this._errorClass)
  }

  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.remove(this._inputErrorClass)
    errorElement.classList.remove(this._errorClass)
    errorElement.textContent = ''
  }

  _isValid (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage)
    } else {
      this._hideInputError(inputElement)
    }
  }

  _setEventListeners () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector)
    this._toggleButtonState(inputList)
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement)
        this._toggleButtonState(inputList)
      })
    })
  }

  enableValidation () {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    this._setEventListeners()
  }

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }

  _toggleButtonState (inputList) {
    if (this._hasInvalidInput(inputList)) {
      this._inactiveSubmit()
    } else {
      this._activeSubmit()
    }
  }

  resetButton () {
    if (this._buttonElement.classList.contains(this._infoButton)) {
      this._activeSubmit()
    }
    else {
      this._inactiveSubmit()
    }
  }
  _inactiveSubmit() {
    this._buttonElement.classList.add(this._inactiveButtonClass)
  }

  _activeSubmit() {
    this._buttonElement.classList.remove(this._inactiveButtonClass)
  }
  hideError () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
    const errorElement = Array.from(this._formElement.querySelectorAll(this._errorSelector))

    inputList.forEach(input => {
      input.classList.remove(this._inputErrorClass)
    })

    errorElement.forEach(error => {
      error.classList.remove(this._errorClass)
      error.textContent = ''
    })
  }
}
