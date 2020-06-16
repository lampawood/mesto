const proFile = document.querySelector('.profile')
const popUp = document.querySelector('.pop-up')
const editButton = proFile.querySelector('.Edit')
const closePop = popUp.querySelector('.pop-up__close')
const popSave = popUp.querySelector('.pop-up__save')

const openPop = function() {
  popUp.classList.toggle('pop-up-open');
}

const saveButt = function(ev) {
  ev.preventDefault()
  let popName = popUp.querySelector('.pop-up__input_title').value
  let popJob = popUp.querySelector('.popup__input_subtitle').value
  let avaName = proFile.querySelector('.profile__title')
  let avaJob = proFile.querySelector('.profile__subtitle')
  avaJob.textContent = popJob;
  avaName.textContent = popName;
  openPop();
}

const closeOverlay = function(ev) {
  if (ev.target !== ev.currentTarget) {
    return
  }
  openPop();
}

editButton.addEventListener("click", openPop);
closePop.addEventListener("click", openPop);
popSave.addEventListener("click", saveButt);
popUp.addEventListener('click', closeOverlay);