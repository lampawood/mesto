

const setLoading = function (isLoading, submitButton) {
  if (isLoading === true) {
    submitButton.textContent = 'Сохранение...'
  }
  else {
    if(submitButton.classList.contains('popup__button_type_place')) {
      submitButton.textContent = 'Создать'
    }
    else  {
      submitButton.textContent = 'Сохранить'
    }
  }
}

export { setLoading }
