import SiteMenuView from './view/site-menu.js';
import TripPathView from './view/trip-path.js';
import TripPriceView from './view/trip-price.js';
import FilterView from './view/filters.js';
import SortView from './view/sort.js';
import EditFormView from './view/edit-form.js';
import PathListView from './view/path-list.js';
import PathFormView from './view/path-form.js';
import { generateTask } from './generate-task.js';
import './generate-task.js';
import { render, RenderPostition, sortPathElements } from './utils.js';

const TASK_COUNT = 20;
const tripMenu = document.querySelector('.trip-main');
const siteMenu = tripMenu.querySelector('.trip-controls__navigation');
const siteFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const pathListComponent = new PathListView();

render(siteMenu, new SiteMenuView().getElement(), RenderPostition.BEFOREEND);

let totalPrice = 0;
const totalPathes = [];

for (let i = 0; i < tasks.length; i++) {
  totalPrice += tasks[i].basicPrice;
  totalPathes.push(tasks[i].destination.name);
}

render(tripMenu, new TripPriceView(totalPrice).getElement(), RenderPostition.AFTERBEGIN);
render(tripMenu, new TripPathView(totalPathes).getElement(), RenderPostition.AFTERBEGIN);
render(siteFilters, new FilterView().getElement(), RenderPostition.BEFOREEND);
render(tripEvents, pathListComponent.getElement(), RenderPostition.AFTERBEGIN);
render(pathListComponent.getElement(), new SortView().getElement(), RenderPostition.BEFOREBEGIN);

const renderPath = (pathList, task) => {
  const pathFormComponent = new PathFormView(task);
  const editFormComponent = new EditFormView(task);

  const replacePathFormToEditForm = () => {
    pathList.replaceChild(editFormComponent.getElement(), pathFormComponent.getElement());
  };

  const replaceEditFormToPathForm = () => {
    pathList.replaceChild(pathFormComponent.getElement(), editFormComponent.getElement());
  };

  pathFormComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePathFormToEditForm();
  });

  editFormComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceEditFormToPathForm();
  });

  editFormComponent.getElement().addEventListener('submit', (event) => {
    event.preventDefault();
    replaceEditFormToPathForm();
  });

  render(pathList, pathFormComponent.getElement(), RenderPostition.BEFOREEND);
};


for (let i = 0; i < tasks.length; i++) {
  renderPath(pathListComponent.getElement(), tasks[i]);
}

sortPathElements();


