import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';

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
const elementsContainerSelector = '.elements';
const cardSection = new Section({
  items: initialCards,
  renderer: (element) => {
    const createdItem = createCard(element.link, element.name);
    cardSection.addItem(createdItem);
  }
}, elementsContainerSelector);

cardSection.renderItems();

function createCard(image, text) {
  const card = new Card(image, text, elementTemplate, inspectImage)
  const cardElement = card.generateCard()
  return cardElement
}


const popupAddElementSelector = '.popup_type_add-element';
const popupAddElementWithForm = new PopupWithForm({
  popupSelector: popupAddElementSelector,
  callbackSubmitForm: (formData) => {
    const createdCard = createCard(formData.popup__link, formData.popup__name);
    cardSection.addItem(createdCard);
    popupAddElementWithForm.close();
  }
})
popupAddElementWithForm.setEventListeners();
function addCard(){
  popupAddElementWithForm.open();
  formValidators['popup-container-type-add-element'].resetValidation();
}
document.querySelector('.profile__add').addEventListener('click', addCard);

// Редактор профиля
const popupChangeProfileSelector = '.popup_type_change-profile';
const popupChangeProfileWithForm = new PopupWithForm({
  popupSelector: popupChangeProfileSelector,
  callbackSubmitForm: (formValues) => {
    userInfo.setUserInfo(formValues)
    popupChangeProfileWithForm.close();
  }
});
popupChangeProfileWithForm.setEventListeners();
function editProfile(){
  const userInfoProfile = userInfo.getUserInfo();
  popupTitle.value = userInfoProfile.title;
  popupSubtitle.value = userInfoProfile.subtitle;
  formValidators['popup-container'].resetValidation();
  popupChangeProfileWithForm.open();
}
document.querySelector('.profile__edit').addEventListener('click', editProfile);

//Картиночки
const popupInspectImageSelector = '.popup_type_inspect-image'
const popupWithImage = new PopupWithImage(popupInspectImageSelector);
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
