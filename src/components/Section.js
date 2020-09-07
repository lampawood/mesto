export default class Section {
  constructor( render, containerSelector) {
    this._renderer = render;
    this._container = containerSelector;
  }

  renderItems(items) {
    items.reverse().forEach(item => {
      this.addItem(item);
    });
  }

  addItem(card) {
    this._container.prepend(this._renderer(card))
  }
}
