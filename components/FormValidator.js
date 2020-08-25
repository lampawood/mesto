export const validationObj = {
    formsSelector: '.pop-up__form',
    inputSelector: '.pop-up__input',
    submitButtonSelector: '.pop-up__save',
    buttonDisabledClass: 'pop-up__save_disabled',
    inputErrorBorder: 'form-input-type_error',
    inputError: 'form-input-error_active'
};

export class FormValidator {
    constructor(obj, validForm) {
        this._form = document.querySelector(validForm)
        // this._formSelector = validForm;
        this._submitButton = this._form.querySelector(obj.submitButtonSelector)
        this._inputSelector = obj.inputSelector;
        // this._submitButtonSelector = obj.submitButtonSelector;
        this._buttonDisabled = obj.buttonDisabledClass;
        this._inputError = obj.inputError;
        this._inputErrorClass = obj.inputErrorBorder
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
        const errors = Array.from(this._form.querySelectorAll('.form-input-error'))
        inputs.forEach(el => {
            // const errorElement = this._form.querySelector(`#${el.id}_error`);
            el.classList.remove(this._inputErrorClass);
            // errorElement.classList.remove('form-input-error_active');
            // errorElement.textContent = '';
            // input.value = '';
        })
        errors.forEach(errorElement => {
            errorElement.classList.remove('form-input-error_active');
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
            // this._submitButton.disabled = true;
            //  console.log('first')
        } else {
            // console.log('second')
            this._submitButton.classList.remove(this._buttonDisabled)
            // this._submitButton.disabled = false;
        }
    }
    resetButton = () => {
        // const  form = document.querySelector(this._formSelector);
        // const button = this._form.querySelector(this._submitButtonSelector);
        // const buttonDisabled = this._buttonDisabled;
        // console.log('third')
        // console.log(this._buttonDisabled)
        if(this._form.classList.contains('pop-up_type_user')){
            // console.log(button)
            this._submitButton.classList.remove(this._buttonDisabled)
// button.disabled = false;
        } else{
            this._submitButton.classList.add(this._buttonDisabled)
            //button.disabled = false;
        }
    }
   _checkEnter(inputList) {
        document.addEventListener('keydown', (event) => {
            if (event.key === "Enter") {
                if (this._hasInvalidInput(inputList)) {
                    event.preventDefault();
                }
            }
        })
    }
    _setEventListeners() {
        const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        // const buttonElement = formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList);

        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList);
                // this._checkEnter(inputList);
            });
        });
    }

    enableValidation() {
        // const form = document.querySelector(this._formSelector);
        this._form.addEventListener('submit', function (event) {
            event.preventDefault();
        });

        this._setEventListeners();
    };

}