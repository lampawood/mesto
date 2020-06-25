
// Находим форму в DOM
const profile = document.querySelector('.profile');
const popUp = document.querySelector('.pop-up');
const formElement = popUp.querySelector('.pop-up__form');
const popOpened = profile.querySelector('.profile__edit');
const popClose = popUp.querySelector('.pop-up__close');
const popName = profile.querySelector('.profile__title');
const popJob = profile.querySelector('.profile__subtitle');
const nameInput = popUp.querySelector('.pop-up__input_type_title');
const jobInput = popUp.querySelector('.pop-up__input_type_subtitle');
  
const popUpToggle = function () {
    if (!popUp.classList.contains('pop-up__opened')) {
        nameInput.value = popName.textContent;
        jobInput.value = popJob.textContent;
       }
    popUp.classList.toggle('pop-up__opened');
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.
    
    popJob.textContent = jobInput.value;
    popName.textContent = nameInput.value;
    popUpToggle();
      }
      

      
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
popOpened.addEventListener('click', popUpToggle);
popClose.addEventListener('click', popUpToggle);