function showInputError(form, inputElement, validationSettings){
  const errorMessage = form.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(validationSettings.inputErrorClass);
  errorMessage.textContent = inputElement.validationMessage;
  errorMessage.classList.add(validationSettings.errorClass);
};

function hideInputError(form, inputElement, validationSettings){
  const errorMessage = form.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorMessage.textContent = '';
  errorMessage.classList.remove(validationSettings.errorClass);
};

function toggleButton(formInputsArr, buttonElement, validationSettings){
  if (formInputsArr.every((input) => {return input.validity.valid})){
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  }
};

function checkInputValidity(formInputsArr, inputElement, form, validationSettings){
    if (!inputElement.validity.valid) {
      showInputError(form, inputElement, validationSettings);
    } else {
      hideInputError(form, inputElement, validationSettings);
    }
    toggleButton(formInputsArr, form.querySelector(validationSettings.submitButtonSelector), validationSettings);
};

function enableValidation(validationSettings){
  const formArr = Array.from(document.querySelectorAll(validationSettings.formSelector));
  formArr.forEach(form => {
      const formInputsArr = Array.from(form.querySelectorAll(validationSettings.inputSelector));
      formInputsArr.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          checkInputValidity(formInputsArr, inputElement, form, validationSettings)
        });
      });
});
};

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_visible'
});
