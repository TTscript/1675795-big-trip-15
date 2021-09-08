import AbstractView from './abstract.js';
import { constants } from '../constants';
import dayjs from 'dayjs';

const paths = constants.paths;

const date = [];

paths.forEach((path) => {
  date.push(path.dateFrom.format('YYYYMMDD'));
});

const startDate = dayjs(Math.min(...date).toString()).format('MMM DD');
const endDate = dayjs(Math.max(...date).toString()).format('DD');

const createTripPathTemplate = (totalPath) => (`<div class="trip-info__main">
    <h1 class="trip-info__title">${totalPath.join(' — ')}</h1>
    <p class="trip-info__dates">${startDate}&nbsp;&mdash;&nbsp;${endDate}</p>
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
