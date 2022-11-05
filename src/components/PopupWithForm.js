import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor({ popupSelector, callbackSubmitForm }) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._popupForm = this.popup.querySelector('.popup__container');
    this._popupInputs = this.popup.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._inputValues = {};
    this._popupInputs.forEach((input) => {
      const value = input.value;
      const inputName = input.name;
      this._inputValues[inputName] = value;
    })
    return this._inputValues;
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm(this._getInputValues());
    })
  }

}
