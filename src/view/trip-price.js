import AbstractView from './abstract.js';

const createTripPriceTemplate = (totalPrice) => (`<p class="trip-info__cost">
Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
</p>`);

export default class TripPrice extends AbstractView {
  constructor(totalPrice) {
    super();
    this._totalPrice = totalPrice;
  }

  getTemplate() {
    return createTripPriceTemplate(this._totalPrice);
  }
}
