// открываем span с ошибкой
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const popupErrorElement = formElement.querySelector(`#${inputElement.id}_error`);
    inputElement.classList.add(inputErrorClass);
    popupErrorElement.textContent = errorMessage;
    popupErrorElement.classList.add('form-input-error_active')
}

// скрываем span  с ошибкой
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const popupErrorElement = formElement.querySelector(`#${inputElement.id}_error`);
    inputElement.classList.remove(inputErrorClass);
    popupErrorElement.classList.remove('form-input-error_active');
    popupErrorElement.textContent = '';
}

// проверка на валидность
const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
}

// ищем не валидные инпуты
const hasInvalidInput = (inputs) => {
    return inputs.some(input => {
        return !input.validity.valid
    })
}

// переключаем стили для инпутов и кнопки sumbit
const toggleButtonState = (inputs, buttonSaveForm, inactiveButtonClass) => {
    if (hasInvalidInput(inputs)) {
        buttonSaveForm.classList.add(inactiveButtonClass);
        buttonSaveForm.disabled = true;
    } else {
        buttonSaveForm.classList.remove(inactiveButtonClass);
        buttonSaveForm.disabled = false;
    }
}

// очистка формы при закрытие
const popupFormClear = ({
    popup,
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
}) => {
    const formElement = popup.querySelector(formSelector);
    // проверка что форма есть в popup
    if (formElement) {
        const inputs = Array.from(formElement.querySelectorAll(inputSelector));
        inputs.forEach(inputElement => {
            // вызов функции очистки инпутов
            hideInputError(formElement, inputElement, inputErrorClass, errorClass);
            inputElement.value = '';
        })
        const buttonSaveForm = formElement.querySelector(submitButtonSelector);
        // вызов функции переключения кнопки submit
        toggleButtonState(inputs, buttonSaveForm, inactiveButtonClass)
    }
}



const setEventListener = (
    formElement,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass) => {
    const inputs = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonSaveForm = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputs, buttonSaveForm, inactiveButtonClass);
    inputs.forEach((input) => {
        input.addEventListener('input', () => {
            isValid(formElement, input, inputErrorClass, errorClass);

            toggleButtonState(inputs, buttonSaveForm, inactiveButtonClass, )
        })
    })
}

const enableValidation = ({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass
}) => {
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        setEventListener(
            formElement,
            inputSelector,
            submitButtonSelector,
            inactiveButtonClass,
            inputErrorClass,
            errorClass);
    })
}

// вызовы
enableValidation({
    formSelector: '.pop-up__form',
    inputSelector: '.pop-up__input',
    submitButtonSelector: '.pop-up__save',
    inactiveButtonClass: 'pop-up__save_disabled',
    inputErrorClass: 'pop-up__input_type_error',
    errorClass: 'form-input-error_active'
})