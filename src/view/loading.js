import AbstractView from './abstract';

const createNoPathTemplate = () => (
  `<p class="trip-events__msg">
    Loading...
  </p>`
);

export default class Loading extends AbstractView {
  getTemplate() {
    return createNoPathTemplate();
  }
}
