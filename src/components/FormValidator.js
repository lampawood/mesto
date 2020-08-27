export class FormValidator {
    constructor(obj, validForm) {
        this._form = document.querySelector(validForm)
        this._submitButton = this._form.querySelector(obj.submitButtonSelector)
        this._inputSelector = obj.inputSelector;
        this._buttonDisabled = obj.buttonDisabledClass;
        this._inputError = obj.inputError;
        this._inputErrorClass = obj.inputErrorBorder;
        this._formInputError = obj.formInputErr;
        this._formInputErrorActive = obj.formInputErrActive
    }


    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`#${inputElement.id}_error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._inputError);
        errorElement.textContent = errorMessage;
    };

    _hideInputError = (inputElement) => {
        const errorElement = this._form.querySelector(`#${inputElement.id}_error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._inputError);
        errorElement.textContent = '';}
    hideErrors = () => {
        const inputs = Array.from(this._form.querySelectorAll(this._inputSelector))
        const errors = Array.from(this._form.querySelectorAll(this._formInputErrorActive))
        inputs.forEach(el => {
            el.classList.remove(this._inputErrorClass);
        })
        errors.forEach(errorElement => {
            errorElement.classList.remove(this._formInputError);
            errorElement.textContent = '';
        })
    }

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid
        });
    }

    _toggleButtonState(inputList) {

        if (this._hasInvalidInput(inputList)) {
            this._submitButton.classList.add(this._buttonDisabled)

        } else {
            this._submitButton.classList.remove(this._buttonDisabled)
        }
    }
   /* resetButton = () => {
        if(this._form.classList.contains('pop-up_type_user')){
            this._submitButton.classList.remove(this._buttonDisabled)
        } else{
            this._submitButton.classList.add(this._buttonDisabled)
        }
    }*/
    _setEventListeners() {
        const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._toggleButtonState(inputList);

        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList);
            });
        });
    }

    enableValidation() {
        this._form.addEventListener('submit', function (event) {
            event.preventDefault();
        });

        this._setEventListeners();
    };

}