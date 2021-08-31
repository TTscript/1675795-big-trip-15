import { generatePath } from './mocks/generate-path.js';
import PathListView from './view/path-list.js';

const TASK_COUNT = 20;
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

export { constants, SortType };
