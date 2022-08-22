let popupTitle = document.querySelector('.popup__input-title');
let popupSubtitle = document.querySelector('.popup__input-subtitle');
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileText = document.querySelector('.profile__text');

function openPopup() {
  popupTitle.value = profileName.textContent;
  popupSubtitle.value = profileText.textContent;
  popup.classList.add('popup_is-opened');
}
function toggleLike(evt) {
  evt.target.classList.toggle('element__like_active');
}

function closePopup() {
  popup.classList.remove('popup_is-opened');
}

function submitForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupTitle.value;
  profileText.textContent = popupSubtitle.value;
  closePopup();
}

document.querySelector('.profile__edit').addEventListener('click', openPopup);
document.querySelector('.popup__close').addEventListener('click', closePopup);
document.querySelector('.popup__container').addEventListener('submit', submitForm);
document.querySelectorAll('.element__like').forEach(item => {
  item.addEventListener('click', toggleLike);
});
