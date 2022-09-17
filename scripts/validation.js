function showInputError(form, inputElement, validationSettings){
  const errorMessage = form.querySelector(`#${inputElement.id}-error`);
  errorMessage.textContent = inputElement.validationMessage;
  errorMessage.classList.add(validationSettings.errorClass);
};

function hideInputError(form, inputElement, validationSettings){
  const errorMessage = form.querySelector(`#${inputElement.id}-error`);
  errorMessage.textContent = '';
  errorMessage.classList.remove(validationSettings.errorClass);
};

function toggleButton(formInputs, buttonElement, validationSettings){
  if (formInputs.every((input) => {return input.validity.valid})){
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  }
};

function checkInputValidity(form, validationSettings){
  const formInputs = Array.from(form.querySelectorAll(validationSettings.inputSelector));
  formInputs.forEach(inputElement => {
    if (!inputElement.validity.valid) {
      showInputError(form, inputElement, validationSettings);
    } else {
      hideInputError(form, inputElement, validationSettings);
    }
  });
  toggleButton(formInputs, form.querySelector(validationSettings.submitButtonSelector), validationSettings);
};

function enableValidation(validationSettings){
  const formArr = Array.from(document.querySelectorAll(validationSettings.formSelector));
  formArr.forEach(form => {
    checkInputValidity(form, validationSettings);
    form.addEventListener('input', () => {
      checkInputValidity(form, validationSettings)
    });
  });
};

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__error_visible'
});
