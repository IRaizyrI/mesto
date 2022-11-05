export class UserInfo {
  constructor(title, subtitle, avatar) {
    this.title = title;
    this.subtitle = subtitle;
    this.avatar = avatar
  }

  getUserInfo() {
    return {
      title: this.title.textContent,
      subtitle: this.subtitle.textContent,
      avatar: this.avatar.src
    };
  }

  setUserInfo(element) {
    this.title.textContent = element.name;
    this.subtitle.textContent = element.about;
  }
  setUserAvatar(avatar){
    this.avatar.src = avatar;
  }
}
