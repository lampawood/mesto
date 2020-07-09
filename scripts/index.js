// popup edit profile
const popupEdit = document.querySelector('.pop-up_type_user');
const popupEditForm = document.querySelector('.pop-up_type_user_form');
const popupEditName = document.querySelector('.pop-up__input_type_name');
const popupEditCaption = document.querySelector('.pop-up__input_type_about');
const popupEditBtnSave = document.querySelector('.pop-up__save_user');
const popupEditBtnExit = document.querySelector('.pop-up__close_user');

// profile 
const nameProfile = document.querySelector('.profile__title');
const captionProfile = document.querySelector('.profile__subtitle');
const buttonEdit = document.querySelector('.profile__edit');
const creatNewCardBtn = document.querySelector('.profile__add');

// доступ к template content
const card = document.querySelector('#card').content;
const gallery = document.querySelector('.elements');

// popup open full image
const popupFull = document.querySelector('.pop-up-full-image');
const popupFullImage = document.querySelector('.pop-up-full-image__image');
const popupFullTitle = document.querySelector('.pop-up-full-image__title');
const popupFullBtnExit = document.querySelector('.pop-up-full-image__close');

// popup добавления новых карточек на страницу
const popupAdd = document.querySelector('.pop-up_type_card');
// форма добавления новых карточек на страницу
const popupAddForm = document.querySelector('.pop-up_type_card_form');
// inputs формы
const popupAddTitle = document.querySelector('.pop-up__card_title');
const popupAddSrc = document.querySelector('.pop-up__card_link');
// закрыть btn
const popupAddBtnExit = document.querySelector('.pop-up__close_card');

// function toggle every popups
const togglePopup = (popup) => {
    popup.classList.toggle(`pop-up__opened`);
}

// fuction изменение профиля
const editProfile = () => {
    popupEditName.value = nameProfile.textContent;
    popupEditCaption.value = captionProfile.textContent;
}

// fuction сохранение изменений в профиле
const saveChangesPopupEdit = (evt) => {
    evt.preventDefault();
    nameProfile.textContent = popupEditName.value;
    captionProfile.textContent = popupEditCaption.value;
    togglePopup(popupEdit);
    editProfile();
}

// закрытие попапы по нажатию на overlay
const closePopup = (evt, popup) => {
    if (evt.target === popup) {
        togglePopup(popup);
    }
}

// функция добавления карточек в конец
const addCardtoEnd = (card) => {
    gallery.append(card);
}

// функция добавления карточки в начало
const addCardtoStart = (card) => {
    gallery.prepend(card);
}

// функция создания карточки
const createCard = (element) => {
    const elementCard = card.cloneNode(true);
    elementCard.querySelector('.card__item').src = element.link;
    elementCard.querySelector('.card__item').alt = element.name;
    elementCard.querySelector('.card__title').textContent = element.name;
    return elementCard;
}

// функция добавления начальных 6 карточек на страницу
const createStartersCard = () => {
    initialCards.forEach((initialCard) => {
        addCardtoEnd(createCard(initialCard));
    })
}

// сохранение новой карточки
const saveNewCard = (evt) => {
    evt.preventDefault();
    const newCard = {
        name: popupAddTitle.value,
        link: popupAddSrc.value
    }
    addCardtoStart(createCard(newCard));
    popupAddForm.reset();
}

// функция переключатель лайков
const likeToggle = (element) => {
    element.classList.toggle('card__like_liked')
}

//функция удаления карточке работа с кнопкой удаления
const trashButton = (element) => {
    const listItem = element.closest('.card');
    listItem.remove();
}

// функция открытия на весь экран картинки полноразмерной
const openPopupFull = (element) => {
    const parentElement = element.closest('.card');
    const elementTitle = parentElement.querySelector('.card__title');
    popupFullImage.src = element.src;
    popupFullImage.alt = elementTitle.textContent;
    popupFullTitle.textContent = elementTitle.textContent;
    togglePopup(popupFull);
}

// вызовы
createStartersCard();

/// добавление слушателей
// popup изменение профиля
buttonEdit.addEventListener('click', () => {
    togglePopup(popupEdit);
    editProfile();
});
popupEditBtnExit.addEventListener('click', () => {
    togglePopup(popupEdit);
});
popupEditForm.addEventListener('submit', saveChangesPopupEdit);

popupEdit.addEventListener('click', (evt) => {
    closePopup(evt, popupEdit);
});

window.addEventListener('keydown', (evt) => {
    closePopup(evt, popupEdit);
});
// слушатель кнопка добавления карточки
// слушатели для попап добавления новой карточки
creatNewCardBtn.addEventListener('click', () => {
    togglePopup(popupAdd);
});
popupAddBtnExit.addEventListener('click', () => {
    togglePopup(popupAdd);
});
popupAddForm.addEventListener('submit', (evt) => {
    saveNewCard(evt);
    togglePopup(popupAdd);
});
popupAdd.addEventListener('click', (evt) => {
    closePopup(evt, popupAdd);
});
window.addEventListener('keydown', (evt) => {
    closePopup(evt, popupAdd);
});

// слушатель для попапа full
popupFullBtnExit.addEventListener('click', () => {
    togglePopup(popupFull);
});
popupFull.addEventListener('click', (evt) => {
    closePopup(evt, popupFull);
});
window.addEventListener('keydown', (evt) => {
    closePopup(evt, popupFull)
});

// слушатель галлереи для работы с кнопками (like, trash) и открытия картинки на весь экран
gallery.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('card__like')) {
        likeToggle(evt.target);
    } else if (evt.target.classList.contains('card__delete')) {
        trashButton(evt.target)
    } else if (evt.target.classList.contains('card__item')) {
        openPopupFull(evt.target);
    }
})