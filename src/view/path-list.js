import { createElement } from '../utils';

const createPathList = () => ('<ul class="trip-events__list"></ul>');

export default class PathList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createPathList();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
