import { createElement } from '../utils';

const createTripPathTemplate = (totalPath) => (`<div class="trip-info__main">
    <h1 class="trip-info__title">${totalPath.join(' — ')}</h1>
    <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
  </div>`);

export default class TripPath {
  constructor(totalPath) {
    this._totalPath = totalPath;
    this._element = null;
  }

  getTemplate() {
    return createTripPathTemplate(this._totalPath);
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
