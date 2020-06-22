
// Находим форму в DOM
const profile = document.querySelector('.profile')
const popUp = document.querySelector('.pop-up')
const formElement = popUp.querySelector('.pop-up__form')
const popOpened = profile.querySelector('.profile__edit')
const popClose = popUp.querySelector('.pop-up__close')
const nameInput = profile.querySelector('.profile__title')
const jobInput = profile.querySelector('.profile__subtitle')
const popName = popUp.querySelector('.pop-up__input_type_title')
const popJob = popUp.querySelector('.pop-up__input_type_subtitle')
  
const popUpToggle = function (ev) {
    if (!popUp.classList.contains('pop-up__opened')) {
        popName.value = nameInput.textContent;
           popJob.value = jobInput.textContent;
       }
    popUp.classList.toggle('pop-up__opened')
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.
    
    popJob.textContent = popJob;
    popName.textContent = popName;
      }
      
const closeOverlay = function(ev) {
     if (ev.target !== ev.currentTarget) {
       return
     }
        popUpToggle()
      }
      
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler)
popOpened.addEventListener('click', popUpToggle)
popClose.addEventListener('click', popUpToggle)
popUp.addEventListener('click', closeOverlay)