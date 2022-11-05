import { Popup } from './Popup.js';

export class PopupDeleteCard extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._callbackSubmitPopup = null;
    this._popupButton = this.popup.querySelector('.popup__submit');
  }
  close() {
    super.close();
  }
  setCallbackSubmitPopup(action){
    this._callbackSubmitPopup = action;

  }
  setEventListeners() {
    super.setEventListeners();
    this._popupButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._callbackSubmitPopup();
      this.close();
    })
  }

}
