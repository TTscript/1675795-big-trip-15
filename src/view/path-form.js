import AbstractView from './abstract.js';
import dayjs from 'dayjs';
import { getTimeDifference } from '../utils/render.js';

const createPathFormTemplate = (paths) => {
  const {type, dateFrom, dateTo, basicPrice, isFavorite, offers} = paths;
  const determineFavorites = () => {
    if (isFavorite === true) {
      return 'event__favorite-btn--active';
    }
  };
// console.log(offers[0].title);
  const createOffersRender = (pathOffers) => {
    const offersBlock = [];

    for (let i = 0; i < pathOffers.length; i++) {
      offersBlock.push(`<li class="event__offer">
      <span class="event__offer-title">${pathOffers[i].title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${pathOffers[i].price}</span>
    </li>`);
    }

    return offersBlock.join('');
  };


  const createRoutePoint = () =>
    `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateFrom}">${dayjs(dateFrom).format('MMM DD')}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">${dayjs(dateFrom).format('HH:mm')}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">${dayjs(dateTo).format('HH:mm')}</time>
        </p>
        <p class="event__duration">${getTimeDifference(dateFrom, dateTo)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basicPrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${createOffersRender(offers)}
      </ul>
      <button class="event__favorite-btn ${determineFavorites()}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
    </li>`;
  return createRoutePoint();
};

export default class PathForm extends AbstractView {
  constructor(path) {
    super();
    this._path = path;
    this._pathClickHandler = this._pathClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createPathFormTemplate(this._path);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setPathFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.event__favorite-icon').addEventListener('click', this._favoriteClickHandler);
  }

  _pathClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setPathClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._pathClickHandler);
  }
}

