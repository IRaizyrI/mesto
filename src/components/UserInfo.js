export class UserInfo {
  constructor(title, subtitle) {
    this.title = title;
    this.subtitle = subtitle;
  }

  getUserInfo() {
    return {
      title: this.title.textContent,
      subtitle: this.subtitle.textContent
    };
  }

  setUserInfo(element) {
    this.title.textContent = element.popup__title;
    this.subtitle.textContent = element.popup__subtitle;
  }

}
