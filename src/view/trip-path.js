import AbstractView from './abstract.js';

const createTripPathTemplate = (totalPath) => (`<div class="trip-info__main">
    <h1 class="trip-info__title">${totalPath.join(' — ')}</h1>
    <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
  </div>`);

export default class TripPath extends AbstractView {
  constructor(totalPath) {
    super();
    this._totalPath = totalPath;
  }

  getTemplate() {
    return createTripPathTemplate(this._totalPath);
  }
}
