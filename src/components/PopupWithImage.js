import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this.popup.querySelector('.popup__image');
    this._popupDescription = this.popup.querySelector('.popup__image-description');
  }

  open(description, link) {
    this._popupImage.alt = description;
    this._popupImage.src = link;
    this._popupDescription.textContent = description;
    super.open();
  }
}
