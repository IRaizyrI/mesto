export class Api{
  constructor(token){
    this._token = token
  }
  _promiseChecker(res){
    if(res.ok){
      return res.json()
    }
    return Promise.reject(`Бип-Буп-Бип! Что-то пошло не так. Статус: ${res.status}`)
  }
  getInitialCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/cards`, {headers: this._token}).then(this._promiseChecker);
  }
  getProfileInfo() {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/users/me`, {headers: this._token}).then(this._promiseChecker);
  }
  patchProfileInfo(name, about){
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/users/me`, {
      method: 'PATCH',
      headers: this._token,
      body: JSON.stringify({
      name: name,
      about: about
      })
  }).then(this._promiseChecker);
  }
  patchUserAvatar(avatar) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/users/me/avatar`, {
        method: "PATCH",
        headers: this._token,
        body: JSON.stringify({
            avatar: avatar,
        }),
    }).then(this._checkResolve);
}
  postCard(name, link){
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/cards`, {
      method: "POST",
      headers: this._token,
      body: JSON.stringify(
        {
          name: name,
          link: link
        }
      ),
  }).then(this._promiseChecker);
}
  deleteCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/cards/${id}`, {
        method: "DELETE",
        headers: this._token,
    })
        .then(this._promiseChecker);
  }
  putLike(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/cards/${id}/likes`, {
        method: "PUT",
        headers: this._token,
    })
        .then(this._promiseChecker);
}
  deleteLike(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-52/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._token,
    })
        .then(this._promiseChecker);
  }
}

