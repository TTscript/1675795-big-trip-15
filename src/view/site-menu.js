import AbstractView from './abstract.js';
import { MenuItem } from '../constants.js';

const createSiteMenuTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn-table trip-tabs__btn--active" href="#">${MenuItem.PATHS}</a>
      <a class="trip-tabs__btn trip-tabs__btn-stats" href="#">${MenuItem.STATISTICS}</a>
  </nav>`
);

export default class SiteMenu extends AbstractView {
  constructor() {
    super();

    this._tableClickHandler = this._tableClickHandler.bind(this);
    this._statsClickHandler = this._statsClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }

  _tableClickHandler(evt) {
    evt.preventDefault();
    this._callback.tableClick();
    document.querySelector('.trip-tabs__btn-stats').classList.remove('trip-tabs__btn--active');
    document.querySelector('.trip-tabs__btn-table').classList.add('trip-tabs__btn--active');
  }

  setTableClickHandler(callback) {
    this._callback.tableClick = callback;
    this.getElement().querySelector('.trip-tabs__btn-table').addEventListener('click', this._tableClickHandler);
  }

  _statsClickHandler(evt) {
    evt.preventDefault();
    this._callback.statsClick();
    document.querySelector('.trip-tabs__btn-table').classList.remove('trip-tabs__btn--active');
    document.querySelector('.trip-tabs__btn-stats').classList.add('trip-tabs__btn--active');
  }

  setStatsClickHandler(callback) {
    this._callback.statsClick = callback;
    this.getElement().querySelector('.trip-tabs__btn-stats').addEventListener('click', this._statsClickHandler);
  }
}

