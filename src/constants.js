import { generateTask } from './mocks/generate-task.js';
import PathListView from './view/path-list.js';

const TASK_COUNT = 20;
const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const pathListComponent = new PathListView();

export const constants = {
  TASK_COUNT,
  tasks,
  pathListComponent,
};
