export class Card {
  constructor(link, text, template, inspectImage) {
      this._template = template;
      this._image = link;
      this._text = text;
      this._inspectImage = inspectImage;
  }
  _setEventListeners(){
    this._cardElement.querySelector('.element__button-like').addEventListener('click', (evt) => this._toggleLike(evt));
    this._cardElement.querySelector('.element__button-delete').addEventListener('click', () => this._deleteElement());
    this._elementImage.addEventListener('click', () => this._inspectImage(this._elementImage));
  }
  _deleteElement(){
    this._cardElement.remove();
    this._cardElement = null;
  }
  _getTemplate() {
    const cardElement = this._template.content.querySelector('.element').cloneNode(true);
    return cardElement;
  }
  _toggleLike(evt) {
    evt.target.classList.toggle('element__button-like_active');
  }
  generateCard(){
    this._cardElement = this._getTemplate();
    this._elementImage = this._cardElement.querySelector('.element__image');
    this._setContent();
    this._setEventListeners();
    return(this._cardElement);
  }
  _inspectImage(){
    popupImage.src = element.src;
    popupImage.alt = element.alt;
    popupImageDescription.textContent = element.closest('.element').querySelector('.element__title').textContent;
    openPopup(popupInspectImage);
  }
  _setContent(){
    this._elementImage.src = this._image;
    this._elementImage.alt = this._text;
    this._cardElement.querySelector('.element__title').textContent = this._text;
  }
}
