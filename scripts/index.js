import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
const popupChangeProfile = document.querySelector('.popup_type_change-profile');
const popupTitle = popupChangeProfile.querySelector('.popup__input_type_title');
const popupSubtitle = popupChangeProfile.querySelector('.popup__input_type_subtitle');

const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const elementTemplate = document.querySelector('.element');
const elementsContainer = document.querySelector('.elements');

const popupAddElement = document.querySelector('.popup_type_add-element');
const popupAddElementLink = popupAddElement.querySelector('.popup__input_type_link');
const popupAddElementName = popupAddElement.querySelector('.popup__input_type_name');

const popupInspectImage = document.querySelector('.popup_type_inspect-image');
const popupImage = popupInspectImage.querySelector('.popup__image');
const popupImageDescription = popupInspectImage.querySelector('.popup__image-description');

const validationSettings ={
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_visible'
}
const formValidators = {}
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(element => {
  renderElement(createCard(element.link, element.name));
});


function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEsc)
}

function openPopup(popup) {
  formValidators['popup-container-type-add-element'].resetValidation();
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEsc)
}

function openPopupChangeProfile(popup) {
  formValidators['popup-container'].resetValidation();
  popupTitle.value = profileName.textContent;
  popupSubtitle.value = profileText.textContent;
  openPopup(popup);
}

function createCard(image, text) {
  const card = new Card(image, text, elementTemplate, inspectImage)
  const cardElement = card.generateCard()
  return cardElement
}

function submitNameForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupTitle.value;
  profileText.textContent = popupSubtitle.value;
  closePopup(popupChangeProfile);
}

function submitElementForm(evt) {
  evt.preventDefault();
  renderElement(createCard(popupAddElementLink.value, popupAddElementName.value));
  formValidators['popup-container-type-add-element'].resetValidation();
  closePopup(popupAddElement);
}

function renderElement(element){
  elementsContainer.prepend(element);
}

function inspectImage(element){
  popupImage.src = element.src;
  popupImage.alt = element.alt;
  popupImageDescription.textContent = element.closest('.element').querySelector('.element__title').textContent;
  openPopup(popupInspectImage);
}

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}



function enableValidation (validationSettings){
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector))
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(validationSettings, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = formValidator;
    formValidator.enableValidation();
  });
};


document.querySelector('.profile__edit').addEventListener('click', () => openPopupChangeProfile(popupChangeProfile));
document.querySelector('.profile__add').addEventListener('click', () => openPopup(popupAddElement));
popupChangeProfile.querySelector('.popup__container').addEventListener('submit', submitNameForm);
popupAddElement.querySelector('.popup__container').addEventListener('submit', submitElementForm);

document.querySelectorAll('.popup').forEach( popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === popup || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    };
  });
});
enableValidation(validationSettings);
