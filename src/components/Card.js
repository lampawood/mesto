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

 
  _getTemplate(){
  return  this._template.cloneNode(true)
  }

 
  generateCard() {
    this._element = this._getTemplate()
    const placeImage = this._element.querySelector('.place__image')
    const placeName = this._element.querySelector('.place__name')
    this._placeLikes = this._element.querySelector('.place__likes')
    const place = this._element.querySelector('.place')

  
    placeImage.src = this._link
    placeImage.alt = this._name
    placeName.textContent = this._name
    place.id = this._id

    if (this._likes.length>=1) {
      this._placeLikes.textContent = this._likes.length
    }

    if (this._owner._id === this._myId) {
      const cardDeleteButton = document.createElement('button')
      cardDeleteButton.classList.add('place__button-delete', 'transition')
      cardDeleteButton.setAttribute('type', 'button')
      cardDeleteButton.setAttribute('aria-label', 'Удалить')
      this._element.querySelector('.place').appendChild(cardDeleteButton)

    
      cardDeleteButton.addEventListener('click', () => {
        this._openPopupDeleteCard(this._id)
      })
    }

    this._likes.forEach((like) => {
      if(like._id === this._myId) {
        const likeButton = this._element.querySelector('.place__button-like')
        likeButton.classList.add('place__button-like_active')
      }
    })

    this._placeListeners(placeImage, placeName)
    return this._element
  }


   _like(evt) {
  
    if(evt.target.classList.contains('place__button-like_active')) {
      this._api.deleteLike(this._id)
        .then(res => {
          evt.target.classList.remove('place__button-like_active')

          if (res.likes.length>=1) {
            this._placeLikes.textContent = res.likes.length
          }
          else {
            this._placeLikes.textContent = ""
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
    else {
      this._api.putlike(this._id)
        .then(res => {
          evt.target.classList.add('place__button-like_active')
          this._placeLikes.textContent = res.likes.length

        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  _placeListeners(placeImage, placeName) {
    this._element.querySelector('.place__button-like').addEventListener('click', (evt) => { this._like(evt) })
    this._element.querySelector('.place__image').addEventListener('click', () => {
      this._openPopupWithImage(placeImage, placeName)
    })
  }
}
