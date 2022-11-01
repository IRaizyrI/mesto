export class Popup {
  constructor(popupSelector) {
    this.popup = popupSelector;
    this.buttonPopupClose = this.popup.querySelector('.popup__close');
  }

  close() {
    this.popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  open() {
    this.popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt){
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  setEventListeners() {
    this.buttonPopupClose.addEventListener('click', () => {
      this.close(this.popup)
    })
    this.popup.addEventListener('mousedown', (evt) => {
      if (evt.target === this.popup || evt.target.classList.contains('popup__close')) {
        this.close(this.popup);
      };
    });
  }
}
