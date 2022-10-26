export class FormValidator {
  constructor(validationSettings, formElement) {
    this._formElement = formElement;
    this.inputSelector = validationSettings.inputSelector;
    this.submitButtonSelector = validationSettings.submitButtonSelector;
    this.inactiveButtonClass = validationSettings.inactiveButtonClass;
    this.inputErrorClass = validationSettings.inputErrorClass;
    this.errorClass = validationSettings.errorClass;
    this.inputList = Array.from(this._formElement.querySelectorAll(this.inputSelector));
    this.buttonElement = this._formElement.querySelector(this.submitButtonSelector);
  }
  _showInputError(inputElement){
    const errorMessage = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    errorMessage.textContent = inputElement.validationMessage;
    errorMessage.classList.add(this.errorClass);
  };

  _hideInputError(inputElement){
    const errorMessage = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
    errorMessage.textContent = '';
    errorMessage.classList.remove(this.errorClass);
  };
  _toggleButton(){
    if (this.inputList.every((input) => {return input.validity.valid})){
      this.buttonElement.classList.remove(this.inactiveButtonClass);
      this.buttonElement.removeAttribute('disabled', 'disabled');
    } else {
      this.buttonElement.classList.add(this.inactiveButtonClass);
      this.buttonElement.setAttribute('disabled', 'disabled');
    }
  };
  _checkInputValidity(inputElement){
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
    this._toggleButton(this.inputList, this._formElement.querySelector(this.submitButtonSelector));
  };
  _setEventListeners(){
      const formInputsArr = Array.from(this._formElement.querySelectorAll(this.inputSelector));
        formInputsArr.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {this._checkInputValidity(inputElement)})
        })
      }


  enableValidation(){
    this._setEventListeners();
};

}



