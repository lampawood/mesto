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
        this._formSelector = validForm;
        this._inputSelector = obj.inputSelector;
        this._submitButtonSelector = obj.submitButtonSelector;
        this._buttonDisabled = obj.buttonDisabledClass;
        this._inputError = obj.inputError;
        this._inputErrorClass = obj.inputErrorBorder
    }


    _showInputError(formElement, inputElement, errorMessage, inputErrorBorder, inputError) {
        const errorElement = formElement.querySelector(`#${inputElement.id}_error`);
        inputElement.classList.add(inputError);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(inputErrorBorder);
    };


    _hideInputError = (formElement, inputElement, inputErrorBorder, inputError) => {
        const errorElement = formElement.querySelector(`#${inputElement.id}_error`);
        inputElement.classList.remove(inputError);
        errorElement.classList.remove(inputErrorBorder);
        errorElement.textContent = '';
    };
    hideErrors = (forms, formId) => {
        const input = Array.from(forms.querySelectorAll('.pop-up__input'))
        const button = forms.querySelector('.pop-up__save')
        input.forEach(el => {
            const errorElement = forms.querySelector(`#${el.id}_error`);
            el.classList.remove('form-input-type_error');
            errorElement.classList.remove('form-input-error_active');
            errorElement.textContent = '';
            input.value = '';
            if (formId) {
                if(el.classList.contains('form-input-type_error')) {
                    button.classList.add('pop-up__save_disabled');
                    button.disabled = false;
                }
                else
                {
                    button.classList.remove('pop-up__save_disabled');
                    button.disabled = true;
                }
            }
            else forms.querySelector('.pop-up__form').reset();
        })
    }

    _checkInputValidity = (formElement, inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(formElement, inputElement, inputElement.validationMessage, this._inputError, this._inputErrorClass);
        } else {
            this._hideInputError(formElement, inputElement, this._inputError, this._inputErrorClass);
        }
    };

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid
        });
    }

    _toggleButtonState(inputList, buttonElement, buttonDisabled) {

        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(buttonDisabled)
        } else {buttonElement.classList.remove(buttonDisabled)}
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
    _setEventListeners(formElement, inputSelector) {
        const inputList = Array.from(formElement.querySelectorAll(inputSelector));
        const buttonElement = formElement.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement, this._buttonDisabled);

        inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement);
                this._toggleButtonState(inputList, buttonElement, this._buttonDisabled);
                this._checkEnter(inputList);
            });
        });
    }

    enableValidation() {
        const form = document.querySelector(this._formSelector);
        form.addEventListener('submit', function (event) {
            event.preventDefault();
        });

        this._setEventListeners(form, this._inputSelector, this._submitButtonSelector);
    };
}