const proFile = document.querySelector('.profile')
const popUp = document.querySelector('.pop-up')
const editButton = proFile.querySelector('.edit')
const closePop = popUp.querySelector('.pop-up__close')
const popSave = popUp.querySelector('.pop-up__save')

const togglePop = function() {
  popUp.classList.toggle('pop-up-open');
}

const saveButt = function(ev) {
  ev.preventDefault()
  let popName = popUp.querySelector('.pop-up__input_title').value
  let popJob = popUp.querySelector('.pop-up__input_subtitle').value
  let avaName = proFile.querySelector('.profile__title')
  let avaJob = proFile.querySelector('.profile__subtitle')
  avaJob.textContent = popJob;
  avaName.textContent = popName;
  togglePop();
}

const closeOverlay = function(ev) {
  if (ev.target !== ev.currentTarget) {
    return
  }
  togglePop();
}

editButton.addEventListener("click", togglePop);
closePop.addEventListener("click", togglePop);
popSave.addEventListener("click", saveButt);
popUp.addEventListener('click', closeOverlay);