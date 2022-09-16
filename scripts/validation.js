const validationArr = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function showInputError(formElement, inputElement){
  const errorMessage = formElement.querySelector(`#${inputElement.id}-error`);
  errorMessage.textContent = inputElement.validationMessage;
  errorMessage.classList.add(validationArr.errorClass);
};

function hideInputError(formElement, inputElement){
  const errorMessage = formElement.querySelector(`#${inputElement.id}-error`);
  errorMessage.classList.remove(validationArr.errorClass);
  errorMessage.textContent = '';
};

function toggleButton(inputList, buttonElement){
  if (inputList.every((input) => {return input.validity.valid})){
    buttonElement.classList.remove(validationArr.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.add(validationArr.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  }
};

function checkInputValidity(form){
  const formInput = Array.from(form.querySelectorAll(validationArr.inputSelector));
  formInput.forEach(inputElement => {
    if (!inputElement.validity.valid) {
      showInputError(form, inputElement);
    } else {
      hideInputError(form, inputElement);
    }
  });
  toggleButton(formInput, form.querySelector(validationArr.submitButtonSelector));
};

function enableValidation(validationArr){
  const formArr = Array.from(document.querySelectorAll(validationArr.formSelector));
  formArr.forEach(inputForm => {
    checkInputValidity(inputForm);
    inputForm.addEventListener('input', () => {
      checkInputValidity(inputForm)});
  });
};

enableValidation(validationArr);
