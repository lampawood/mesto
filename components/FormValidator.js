export const validationObj = { 
    formsSelector: '.pop-up__form', 
    inputSelector: '.pop-up__input', 
    submitButtonSelector: '.pop-up__save', 
}; 
 
export default class FormValidator { 
    constructor(obj, validForm) { 
        this._formSelector = validForm 
        this._inputSelector = obj.inputSelector 
        this._submitButtonSelector = obj.submitButtonSelector 
    } 
 
    _showInputError(formElement, inputElement, errorMessage) { 
        const errorElement = formElement.querySelector(`#${inputElement.id}_error`); 
        inputElement.classList.add('form-input-type_error'); 
        errorElement.textContent = errorMessage; 
        errorElement.classList.add('form-input-error_active'); 
    }; 
 
    _hideInputError = (formElement, inputElement) => { 
        const errorElement = formElement.querySelector(`#${inputElement.id}_error`); 
        inputElement.classList.remove('form-input-type_error'); 
        errorElement.classList.remove('form-input-error_active'); 
        errorElement.textContent = ''; 
    }; 
 
    _checkInputValidity = (formElement, inputElement) => { 
        if (!inputElement.validity.valid) { 
            this._showInputError(formElement, inputElement, inputElement.validationMessage); 
        } else { 
            this._hideInputError(formElement, inputElement); 
        } 
    }; 
 
    _hasInvalidInput(inputList) { 
        return inputList.some((inputElement) => { 
            return !inputElement.validity.valid 
        }); 
    } 
 
    _toggleButtonState(inputList, buttonElement) { 
        console.log(buttonElement);
        if(this._hasInvalidInput(inputList)) { 
            buttonElement.classList.add('pop-up__save_disabled'); 
            buttonElement.disabled = true; 
        } 
         else 
        { 
            buttonElement.classList.remove('pop-up__save_disabled');
           
            buttonElement.disabled = false; 
        } 
    } 
 
    _setEventListeners(formElement, inputSelector, submitButtonSelector) { 
 
        const inputList = Array.from(formElement.querySelectorAll(inputSelector)); 
        const buttonElement = formElement.querySelector(this._submitButtonSelector) 
        this._toggleButtonState(inputList, buttonElement) 
 
        inputList.forEach(inputElement => { 
            inputElement.addEventListener('input', () => { 
                this._checkInputValidity(formElement, inputElement); 
                this._toggleButtonState(inputList, buttonElement); 
 
            }); 
        }); 
    } 
 
    enableValidation() { 
        const form = document.querySelector(this._formSelector); 
        form.addEventListener('submit', function(event) { 
            event.preventDefault(); 
        }); 
 
        this._setEventListeners(form, this._inputSelector, this._submitButtonSelector); 
    }; 
} 