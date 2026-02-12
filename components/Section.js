class Section {
  constructor({ items, renderer, containerSelector}) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      // call renderer on each item
    })
  }

  addItem(element) {
    //add element to container
    addTodoToList(values);
  }
}

export default Section;