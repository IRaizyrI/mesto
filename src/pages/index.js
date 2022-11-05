import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { Api } from '../components/Api.js';
import { PopupDeleteCard } from '../components/PopupDeleteCard.js';

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
const profileAvatar = document.querySelector('.profile__avatar-image')
const elementTemplate = document.querySelector('.element');
const elementsContainer = document.querySelector('.elements');

const userInfo = new UserInfo(profileName, profileText, profileAvatar);
const api = new Api({
  authorization: 'f20963a7-7d81-4b3c-bd7d-ee113d720791',
  "Content-Type": "application/json",
},)

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
let userId = null;
//Карточки
const elementsContainerSelector = '.elements';
const cardSection = new Section({
  renderer: (element) => {
    const createdItem = createCard(element.link, element.name, element.owner._id, element.likes, element._id, userId);
    cardSection.addItem(createdItem);
  }
}, elementsContainerSelector);

Promise.all([api.getInitialCards(), api.getProfileInfo()])
  .then(([cardsData, userData]) => {
    userId = userData._id;
    cardSection.renderItems(cardsData.reverse());
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData.avatar);
  })
  .catch((err) => console.log(err));


function createCard(image, text, ownerId, likes, cardId, userId) {
  const card = new Card(image, text, ownerId, elementTemplate, inspectImage, likes, cardId, userId,
    { handleLike: () => {
      handleLikeClick(card, cardId)
    },
    handleDelete: () => {
      handleDeleteClick(card, cardId)
    }
    })

  const cardElement = card.generateCard()
  card.toggleLike(likes)
  return cardElement
}
const deleteCardPopup = new PopupDeleteCard({popupSelector: '.popup_type_delete-card'})
deleteCardPopup.setEventListeners();
function handleDeleteClick(card, id) {
  deleteCardPopup.open();
  deleteCardPopup.setCallbackSubmitPopup(() => {
    api.deleteCard(id)
    .then(() => {card.deleteElement()})
    .catch((err) => {console.log(err)})
  })
}
function handleLikeClick (card, id) {
  if(card.isLiked()){
    api.deleteLike(id).then((likesArr) => {card.toggleLike(likesArr.likes)}).catch((err) => console.log(err));
  }else{
    api.putLike(id).then((likesArr) => {card.toggleLike(likesArr.likes)}).catch((err) => console.log(err));
  }
}
const popupAddElementSelector = '.popup_type_add-element';
const addElementButton = document.querySelector(popupAddElementSelector).querySelector(validationSettings.submitButtonSelector)
const popupAddElementWithForm = new PopupWithForm({
  popupSelector: popupAddElementSelector,
  callbackSubmitForm: (formData) => {
    addElementButton.textContent = 'Сохранение...'
    api.postCard(formData.popup__name, formData.popup__link)
    .then((card) => {
        const createdCard = createCard(card.link, card.name, card.owner._id, card.likes, card._id, userId)
        cardSection.addItem(createdCard);
        popupAddElementWithForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      addElementButton.textContent = 'Создать'
    })
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
const changeProfileButton = document.querySelector(popupChangeProfileSelector).querySelector(validationSettings.submitButtonSelector)
const popupChangeProfileWithForm = new PopupWithForm({
  popupSelector: popupChangeProfileSelector,
  callbackSubmitForm: (formValues) => {
    changeProfileButton.textContent = 'Сохранение...'
    api.patchProfileInfo(formValues.name, formValues.about).then(() => {
      userInfo.setUserInfo(formValues)
      popupChangeProfileWithForm.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      changeProfileButton.textContent = 'Сохранить'
    })

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

const popupChangeAvatarSelector = '.popup_type_change-avatar'
const changeAvatarButton = document.querySelector(popupChangeAvatarSelector).querySelector(validationSettings.submitButtonSelector)
const popupAvatarWithForm = new PopupWithForm({
  popupSelector: popupChangeAvatarSelector,
  callbackSubmitForm: (formValues) => {
    changeAvatarButton.textContent = 'Сохранение...'
    api.patchUserAvatar(formValues.avatar_link).then(() => {
      userInfo.setUserAvatar(formValues.avatar_link);
      popupAvatarWithForm.close();
    }).catch((err) => console.log(err)).finally(() => {
      changeAvatarButton.textContent = 'Сохранить';
    })


  }
});
popupAvatarWithForm.setEventListeners();
function editAvatar(){
  formValidators['avatar'].resetValidation();
  popupAvatarWithForm.open();
}
document.querySelector('.profile__avatar-edit').addEventListener('click', editAvatar);
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
