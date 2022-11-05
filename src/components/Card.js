export class Card {
  constructor(link, description, ownerId, template, inspectImage, likes, cardId, userId, { handleLike, handleDelete }) {
      this._template = template;
      this._image = link;
      this._description = description;
      this._inspectImage = inspectImage;
      this._ownerId = ownerId;
      this._userId = userId;
      this._likes = likes;
      this._cardId = cardId;
      this._handleLike = handleLike;
      this._handleDelete = handleDelete;
  }
  _checkLiked(){
      this._isLiked = this._likes.some((like) => {return like._id === this._userId})
  }
  _setEventListeners(){
    this._cardElement.querySelector('.element__button-like').addEventListener('click', () => this._handleLike());
    this._cardElement.querySelector('.element__button-delete').addEventListener('click', () => this._handleDelete());
    this._elementImage.addEventListener('click', () => this._inspectImage(this._description, this._image));
  }
  deleteElement(){
    this._cardElement.remove();
    this._cardElement = null;
  }
  _getTemplate() {
    return this._template.content.querySelector('.element').cloneNode(true);
  }
  toggleLike(likesArray) {
    this._likes = likesArray;
    this._checkLiked();
    this._elementLikeCounter.textContent = this._likes.length
    if (this._isLiked) {
      this._elementLikeButton.classList.add('element__button-like_active');
    } else {
      this._elementLikeButton.classList.remove('element__button-like_active');
    }
  }

  _checkOwnership(){
    if(this._ownerId != this._userId){
      this._cardElement.querySelector('.element__button-delete').remove()
    }
  }
  isLiked(){
    return this._isLiked
  }
  generateCard(){
    this._cardElement = this._getTemplate();
    this._elementImage = this._cardElement.querySelector('.element__image');
    this._elementLikeCounter = this._cardElement.querySelector('.element__like-counter')
    this._elementLikeButton = this._cardElement.querySelector('.element__button-like')
    this._setContent();
    this._checkLiked();
    this._setEventListeners();
    this._checkOwnership();
    return(this._cardElement);
  }
  _setContent(){
    this._elementImage.src = this._image;
    this._elementImage.alt = this._description;
    this._cardElement.querySelector('.element__title').textContent = this._description;

  }
}
