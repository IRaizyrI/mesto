
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
  renderElement(createElement(element.link, element.name));
});


function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEsc)
}

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEsc)
}

function openPopupChangeProfile(popup) {
  popupTitle.value = profileName.textContent;
  popupSubtitle.value = profileText.textContent;
  openPopup(popup);
}

function submitNameForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupTitle.value;
  profileText.textContent = popupSubtitle.value;
  closePopup(popupChangeProfile);
}

function submitElementForm(evt) {
  evt.preventDefault();
  renderElement(createElement(popupAddElementLink.value, popupAddElementName.value));
  popupAddElementLink.value = '';
  popupAddElementName.value = '';
  closePopup(popupAddElement);
}

function createElement(link, name){
  const userElement = elementTemplate.content.querySelector('.element').cloneNode(true);
  const elementImage =  userElement.querySelector('.element__image')
  elementImage.src = link;
  elementImage.alt = name;
  userElement.querySelector('.element__title').textContent = name;
  userElement.querySelector('.element__button-like').addEventListener('click', toggleLike);
  userElement.querySelector('.element__button-delete').addEventListener('click', deleteElement);
  elementImage.addEventListener('click', () => inspectImage(elementImage));
  return(userElement);
}

function renderElement(element){
  elementsContainer.prepend(element);
}


function deleteElement(evt){
  evt.target.closest('.element').remove();
}

function toggleLike(evt) {
  evt.target.classList.toggle('element__button-like_active');
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

document.querySelector('.profile__edit').addEventListener('click', () => openPopupChangeProfile(popupChangeProfile));
document.querySelector('.profile__add').addEventListener('click', () => openPopup(popupAddElement));
popupChangeProfile.querySelector('.popup__container').addEventListener('submit', submitNameForm);
popupAddElement.querySelector('.popup__container').addEventListener('submit', submitElementForm);

document.querySelectorAll('.popup__close').forEach(button => {
  const buttonsPopup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(buttonsPopup));
});

document.querySelectorAll('.popup').forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if(evt.target === popup){
      closePopup(popup)
    };
  });
});
