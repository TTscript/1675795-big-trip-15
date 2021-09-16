import { generatePath } from './mocks/generate-path.js';
import PathListView from './view/path-list.js';

const PATH_COUNT = 20;
const paths = new Array(PATH_COUNT).fill().map(generatePath);
const pathListComponent = new PathListView();

const constants = {
  PATH_COUNT,
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

const UserAction = {
  UPDATE_PATH: 'UPDATE_PATH',
  ADD_PATH: 'ADD_PATH',
  DELETE_PATH: 'DELETE_PATH',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export { constants, SortType, Offer, UserAction, UpdateType, FilterType };
