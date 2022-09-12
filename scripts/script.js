
let popupChangeProfile = document.querySelector('.popup_type_change-profile');
let popupTitle = popupChangeProfile.querySelector('.popup__input_type_title');
let popupSubtitle = popupChangeProfile.querySelector('.popup__input_type_subtitle');

let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');
let elementTemplate = document.querySelector('.element');
let elements = document.querySelector('.elements');

let popupAddElement = document.querySelector('.popup_type_add-element');
let popupAddElementLink = popupAddElement.querySelector('.popup__input_type_link');
let popupAddElementName = popupAddElement.querySelector('.popup__input_type_name');

let popupInspectImage = document.querySelector('.popup_type_inspect-image');
let popupImage = popupInspectImage.querySelector('.popup__image');
let popupImageDescription = popupInspectImage.querySelector('.popup__image-description');


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
  const userElement = elementTemplate.content.querySelector('.element').cloneNode(true);
  userElement.querySelector('.element__image').src = element.link;
  userElement.querySelector('.element__image').alt = element.name;
  userElement.querySelector('.element__title').textContent = element.name;
  userElement.querySelector('.element__image').addEventListener('click', inspectImage);
  userElement.querySelector('.element__button-like').addEventListener('click', toggleLike);
  userElement.querySelector('.element__button-delete').addEventListener('click', elementDelete);
  elements.append(userElement);
});

function openPopupChangeProfile() {
  popupTitle.value = profileName.textContent;
  popupSubtitle.value = profileText.textContent;
  popupChangeProfile.classList.add('popup_is-opened');
}

function closePopup() {
  popupChangeProfile.classList.remove('popup_is-opened');
  popupAddElement.classList.remove('popup_is-opened');
  popupInspectImage.classList.remove('popup_is-opened');
}

function submitNameForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupTitle.value;
  profileText.textContent = popupSubtitle.value;
  closePopup();
}
function submitElementForm(evt) {
  evt.preventDefault();
  const userElement = elementTemplate.content.querySelector('.element').cloneNode(true);
  userElement.querySelector('.element__image').src = popupAddElementLink.value;
  userElement.querySelector('.element__image').alt = popupAddElementName.value;
  userElement.querySelector('.element__title').textContent = popupAddElementName.value;
  userElement.querySelector('.element__button-like').addEventListener('click', toggleLike);
  userElement.querySelector('.element__button-delete').addEventListener('click', elementDelete);
  userElement.querySelector('.element__image').addEventListener('click', inspectImage);
  elements.prepend(userElement);
  closePopup();
}
function elementDelete(evt){
  evt.target.closest('.element').remove();
}
function submitNameForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupTitle.value;
  profileText.textContent = popupSubtitle.value;
  closePopup();
}
function openPopupAddElement() {
  popupAddElement.classList.add('popup_is-opened');
}
function toggleLike(evt) {
  evt.target.classList.toggle('element__button-like_active');
}

function inspectImage(evt){
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupImageDescription.textContent = evt.target.closest('.element').querySelector('.element__title').textContent;
  popupInspectImage.classList.add('popup_is-opened');
}
document.querySelector('.profile__edit').addEventListener('click', openPopupChangeProfile);
document.querySelector('.profile__add').addEventListener('click', openPopupAddElement);

popupChangeProfile.querySelector('.popup__container').addEventListener('submit', submitNameForm);
popupAddElement.querySelector('.popup__container').addEventListener('submit', submitElementForm);

document.querySelectorAll('.popup__close').forEach(item => {
  item.addEventListener('click', closePopup);
});
