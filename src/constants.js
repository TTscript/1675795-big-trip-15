import { generateTask } from './generate-task.js';
import PathListView from './view/path-list.js';

const TASK_COUNT = 20;
const tripMenu = document.querySelector('.trip-main');
const siteMenu = tripMenu.querySelector('.trip-controls__navigation');
const siteFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const pathListComponent = new PathListView();

export const constants = {
  TASK_COUNT,
  tripMenu,
  siteMenu,
  siteFilters,
  tripEvents,
  tasks,
  pathListComponent,
};
