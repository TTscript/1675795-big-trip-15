import AbstractView from './abstract.js';
import { FilterType } from '../constants.js';

const NoTasksTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const createEmptyListTemplate = (filterType) => {
  const noPathTextValue = NoTasksTextType[filterType];

  return (`<p class="trip-events__msg">
    ${noPathTextValue}
  </p>`);
};

export default class EmptyList extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createEmptyListTemplate(this._data);
  }
}
