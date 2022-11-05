export class Section {
  constructor({renderer}, containerSelector){
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }
  addItem(element){
    this._containerSelector.prepend(element);
  }
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

}

