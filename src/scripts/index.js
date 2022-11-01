import '../pages/index.css';

import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { PopupWithForm } from './PopupWithForm.js';
import { PopupWithImage } from './PopupWithImage.js';
import { UserInfo } from './UserInfo.js';
import { Section } from './Section.js';

const validationSettings ={
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_visible'
};

const popupChangeProfile = document.querySelector('.popup_type_change-profile');
const popupTitle = popupChangeProfile.querySelector('.popup__input_type_title');
const popupSubtitle = popupChangeProfile.querySelector('.popup__input_type_subtitle');

const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');
const elementTemplate = document.querySelector('.element');
const elementsContainer = document.querySelector('.elements');

const popupAddElement = document.querySelector('.popup_type_add-element');

const popupInspectImage = document.querySelector('.popup_type_inspect-image');

const userInfo = new UserInfo(profileName, profileText);

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

//Карточки
const cardSection = new Section({
  items: initialCards,
  renderer: (element) => {
    const createdItem = createCard(element.link, element.name);
    cardSection.addItem(createdItem);
  }
}, elementsContainer);

cardSection.renderItems();

function createCard(image, text) {
  const card = new Card(image, text, elementTemplate, inspectImage)
  const cardElement = card.generateCard()
  return cardElement
}

const popupAddElementWithForm = new PopupWithForm({
  popupSelector: popupAddElement,
  callbackSubmitForm: (formData) => {
    const createdCard = createCard(formData.popup__link, formData.popup__name);
    cardSection.addItem(createdCard);
    popupAddElementWithForm.close();
  }
})
popupAddElementWithForm.setEventListeners();
document.querySelector('.profile__add').addEventListener('click', () => {
  popupAddElementWithForm.open();
  formValidators['popup-container-type-add-element'].resetValidation();
});

// Редактор профиля
const popupChangeProfileWithForm = new PopupWithForm({
  popupSelector: popupChangeProfile,
  callbackSubmitForm: (formValues) => {
    userInfo.setUserInfo(formValues)
    popupChangeProfileWithForm.close();
  }
});
popupChangeProfileWithForm.setEventListeners();
document.querySelector('.profile__edit').addEventListener('click', () => {
  const userInfoProfile = userInfo.getUserInfo();
  popupTitle.value = userInfoProfile.title;
  popupSubtitle.value = userInfoProfile.subtitle;
  formValidators['popup-container'].resetValidation();
  popupChangeProfileWithForm.open();
})

//Картиночки
const popupWithImage = new PopupWithImage(popupInspectImage);
popupWithImage.setEventListeners();

function inspectImage(description, link){
  popupWithImage.open(description, link);
}

//Валидация
const formValidators = {}
function enableValidation (validationSettings){
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector))
  formList.forEach((formElement) => {
    const formValidator = new FormValidator(validationSettings, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = formValidator;
    formValidator.enableValidation();
  });
};


enableValidation(validationSettings);
