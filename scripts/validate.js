export class Validate {
    constructor(obj, validForm) {
      this._formSelector = validForm,
        this._inputSelector = obj.inputSelector,
        this._submitButtonSelector = obj.submitButtonSelector
    }
  
    static _showInputError = (formElement, inputElement, errorMessage) => {
      const errorElement = formElement.querySelector(`#${inputElement.id}_error`);
      inputElement.classList.add('form__input_error');
      errorElement.textContent = errorMessage;
      errorElement.classList.add('form__input-error');
    };
  
    static hideInputError = (formElement, inputElement) => {
      const errorElement = formElement.querySelector(`#${inputElement.id}_error`);
      inputElement.classList.remove('form__input_error');
      errorElement.classList.remove('form__input-error');
      errorElement.textContent = '';
    };
  
    static _checkInputValidity = (formElement, inputElement) => {
      if (!inputElement.validity.valid) {
        FormValidator._showInputError(formElement, inputElement, inputElement.validationMessage);
      } else {
        FormValidator.hideInputError(formElement, inputElement);
      }
    };
  
    static hasInvalidInput = (inputList) => {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid
      });
    }
  
    static toggleButtonState = (inputList, buttonElement) => {
  
      if (FormValidator.hasInvalidInput(inputList)) {
        buttonElement.classList.add('pop-up__save_disabled')
      } else buttonElement.classList.remove('pop-up__save_disabled')
    }
  
    static _checkEnter = (inputList) => {
  
      document.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) {
          if (FormValidator.hasInvalidInput(inputList)) {
            event.preventDefault();
          } else return
        }
      })
    }
  
    _setEventListeners = (formElement, inputSelector, submitButtonSelector) => {
  
      const inputList = Array.from(formElement.querySelectorAll(inputSelector));
      const buttonElement = formElement.querySelector(submitButtonSelector)
      FormValidator.toggleButtonState(inputList, buttonElement)
  
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
          FormValidator._checkInputValidity(formElement, inputElement);
          FormValidator.toggleButtonState(inputList, buttonElement);
          FormValidator._checkEnter(inputList);
        });
      });
    }
  
    enableValidation = () => {
      const form = Array.from(document.querySelectorAll(this._formSelector));
  
      form.forEach((formElement) => {
  
        formElement.addEventListener('submit', function (event) {
          event.preventDefault();
        });
  
        this._setEventListeners(formElement, this._inputSelector, this._submitButtonSelector);
  
      });
    };
  }