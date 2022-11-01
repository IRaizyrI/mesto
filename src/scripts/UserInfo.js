export class UserInfo {
  constructor(title, subtitle) {
    this.title = title;
    this.subtitle = subtitle;
  }

  getUserInfo() {
    const info = {
      title: this.title.textContent,
      subtitle: this.subtitle.textContent
    }
    return info;
  }

  setUserInfo(element) {
    this.title.textContent = element.popup__title;
    this.subtitle.textContent = element.popup__subtitle;
  }

}
