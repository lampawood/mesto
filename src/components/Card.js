export default class Card {
  constructor(place, template, openPopupWithImage, myId, openPopupDeleteCard, api) {
    this._name = place.name;
    this._link = place.link;
    this._id = place._id;
    this._likes = place.likes;
    this._owner = place.owner;
    this._myId = myId;
    this._template = template;
    this._openPopupWithImage = openPopupWithImage;
    this._openPopupDeleteCard = openPopupDeleteCard;
    this._api = api;
  }

  // Метод, который клонирует содержимое тега template
  _getTemplate() {
    // клонируем содержимое тега template
    return  this._template.cloneNode(true)
  }

  // Метод, который вставит данные в разметку и подготовит карточку к публикации.
  generateCard() {
    this._element = this._getTemplate()
    const placeImage = this._element.querySelector('.place__image')
    const placeName = this._element.querySelector('.place__name')
    this._placeLikes = this._element.querySelector('.place__likes')
    const place = this._element.querySelector('.place')

    // Добавим данные
    placeImage.src = this._link
    placeImage.alt = this._name
    placeName.textContent = this._name
    place.id = this._id

    if (this._likes.length>=1) {
      this._placeLikes.textContent = this._likes.length
    }

    // если id автора карточки = id владельца страницы, то добавить карточке кнопку удаления и навесить на нее листенер
    if (this._owner._id === this._myId) {
      const cardDeleteButton = document.createElement('button')
      cardDeleteButton.classList.add('place__button-delete', 'transition')
      cardDeleteButton.setAttribute('type', 'button')
      cardDeleteButton.setAttribute('aria-label', 'Удалить')
      this._element.querySelector('.place').appendChild(cardDeleteButton)

      // добавим листенер для открытия попапа по клику на иконку удаления
      cardDeleteButton.addEventListener('click', () => {
        this._openPopupDeleteCard(this._id)
      })
    }

    // переберём список лайков элемента, и если есть лайк владельца страницы, закрасим сердечко
    this._likes.forEach((like) => {
      if(like._id === this._myId) {
        const likeButton = this._element.querySelector('.place__button-like')
        likeButton.classList.add('place__button-like_active')
      }
    })

    // добавим остальные листенеры
    this._placeListeners(placeImage, placeName)
    // Вернём элемент наружу
    return this._element
  }

  // Лайки
  _like(evt) {
    // если лайк был проставлен
    if(evt.target.classList.contains('place__button-like_active')) {
      // убрать лайк
      this._api.deleteLike(this._id)
          .then(res => {
            // убрать с сердечка класс, который делает его закрашенным
            evt.target.classList.remove('place__button-like_active')

            // и, если количество лайков больше 0
            if (res.likes.length>=1) {
              //вывести количество лайков под иконкой сердечка
              this._placeLikes.textContent = res.likes.length
            }
            else {
              // если количество лайков равно 0, то убрать цифру 0 под иконкой сердечка
              this._placeLikes.textContent = ""
            }
          })
          .catch(err => {
            console.log(err)
          })
    }
    else {
      // поставить лайк
      this._api.putlike(this._id)
          .then(res => {
            // добавить сердечку класс, который делает его закрашенным
            evt.target.classList.add('place__button-like_active')
            // обновить цифру (количество лайков) под иконкой сердечка
            this._placeLikes.textContent = res.likes.length

          })
          .catch(err => {
            console.log(err)
          })
    }
  }
  // Слушатели для карточек
  _placeListeners(placeImage, placeName) {
    this._element.querySelector('.place__button-like').addEventListener('click', (evt) => { this._like(evt) })
    this._element.querySelector('.place__image').addEventListener('click', () => {
      this._openPopupWithImage(placeImage, placeName)
    })
  }
}
