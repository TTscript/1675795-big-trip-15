import AbstractView from './abstract.js';
import dayjs from 'dayjs';

const createTripPathTemplate = (paths, totalPath, totalPrice) => {
  const date = [];
  date.sort((a, b) => Math.abs(a) - Math.abs(b));

  paths.forEach((path) => {
    const formattedDate = dayjs(path.dateFrom).format('YYYYMMDD');
    date.push(formattedDate);
  });
  const startDate = dayjs(Math.min(...date).toString()).format('MMM DD');
  const endDate = dayjs(Math.max(...date).toString()).format('MMM DD');

  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${totalPath.join(' — ')}</h1>
      <p class="trip-info__dates">${startDate}&nbsp;&mdash;&nbsp;${endDate}</p>
    </div>
    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
    </p>
  </section>`;
};

export default class TripPath extends AbstractView {
  constructor(paths, totalPath, totalPrice) {
    super();
    this._paths = paths;
    this._totalPath = totalPath;
    this._totalPrice = totalPrice;
  }

  getTemplate() {
    return createTripPathTemplate(this._paths, this._totalPath, this._totalPrice);
  }
}
