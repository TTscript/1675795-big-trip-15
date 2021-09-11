import { generatePath } from './mocks/generate-path.js';
import PathListView from './view/path-list.js';

const TASK_COUNT = 1;
const paths = new Array(TASK_COUNT).fill().map(generatePath);
const pathListComponent = new PathListView();

const constants = {
  TASK_COUNT,
  paths,
  pathListComponent,
};

const SortType = {
  DEFAULT: 'default',
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
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

export { constants, SortType, Offer };
