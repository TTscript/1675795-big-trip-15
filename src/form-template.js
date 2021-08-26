import { getRandomInteger } from './utils/common.js';

export const createFormTemplate = (tasks, resetButtonName) => {
  const {type, destination, dateFrom, dateTo, basicPrice, offers} = tasks;


  const createPhotos = () => {
    const photos = [];
    destination.pictures.forEach((photo) => {
      photos.push(`<img class="event__photo" src=${photo.src}>`);
    });

    return photos.join('');
  };

  const Offer = {
    BUSINESS: 'Upgrade to a business class',
    RADIO: 'Choose the radio station',
    UBER: 'Order Uber',
    LUGGAGE: 'Add luggage',
    CAR: 'Rent a car',
    BREAKFAST: 'Add breakfast',
    COMFORT: 'Switch to comfort',
    SEAT: 'Choose seats',
    TRAIN: 'Travel by train',
    MEAL: 'Add meal',
  };

  const createOffersRender = () => {
    const offersBlock = [];

    for (let i = 0; i < offers.offer.length; i++) {
      let bend = '';
      switch (offers.offer[i].title) {
        case Offer.BUSINESS:
          bend = 'business-class';
          break;
        case Offer.RADIO:
          bend = 'radio-station';
          break;
        case Offer.UBER:
          bend = 'order-uber';
          break;
        case Offer.LUGGAGE:
          bend = 'luggage';
          break;
        case Offer.CAR:
          bend = 'rent-car';
          break;
        case Offer.BREAKFAST:
          bend = 'breakfast';
          break;
        case Offer.COMFORT:
          bend = 'comfort';
          break;
        case Offer.SEAT:
          bend = 'seats';
          break;
        case Offer.TRAIN:
          bend = 'train';
          break;
        case Offer.MEAL:
          bend = 'meal';
          break;
      }

      const isChecked = () => Boolean(getRandomInteger(0, 1)) === true ? 'checked' : '';

      offersBlock.push(`<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${bend}-1" type="checkbox" name="event-offer-${bend}" ${isChecked()}>
      <label class="event__offer-label" for="event-offer-${bend}-1">
        <span class="event__offer-title">${offers.offer[i].title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offers.offer[i].price}</span>
      </label>
    </div>`);
    }
    return offersBlock.join('');
  };

  return `<form class="event event--edit" action="#" method="post">
<header class="event__header">
  <div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

    <div class="event__type-list">
      <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>

        <div class="event__type-item">
          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
        </div>

        <div class="event__type-item">
          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
        </div>

        <div class="event__type-item">
          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
        </div>

        <div class="event__type-item">
          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
        </div>

        <div class="event__type-item">
          <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
          <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
        </div>

        <div class="event__type-item">
          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
        </div>

        <div class="event__type-item">
          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
        </div>

        <div class="event__type-item">
          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
        </div>

        <div class="event__type-item">
          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
        </div>

        <div class="event__type-item">
          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
        </div>
      </fieldset>
    </div>
  </div>

  <div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
    <datalist id="destination-list-1">
      <option value="Amsterdam"></option>
      <option value="Geneva"></option>
      <option value="Chamonix"></option>
    </datalist>
  </div>

  <div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom.format('DD/MM/YY HH:MM')}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo.format('DD/MM/YY HH:MM')}">
  </div>

  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basicPrice}">
  </div>

  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
  <button class="event__reset-btn" type="reset">${resetButtonName}</button>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</header>
<section class="event__details">
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
      ${createOffersRender()}
    </div>
  </section>

  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destination.description}</p>


    <div class="event__photos-container">
    <div class="event__photos-tape">
    ${createPhotos()}
    </div>
    </div>
  </section>
</section>

</form>`;
};
