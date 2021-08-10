import { createSiteMenuTemplate } from './view/site-menu.js';
import { createTripPathTemplate } from './view/trip-path.js';
import { createTripPriceTemplate } from './view/trip-price.js';
import { createFiltersTemplate } from './view/filters.js';
import { createSortEventsTemplate } from './view/sort.js';
import { createFormTemplate } from './view/create-form.js';
import { createEditFormTemplate } from './view/edit-form.js';
import { createPathFormTemplate } from './view/path-form.js';
import { generateTask } from './generate-task.js';
import './generate-task.js';
import { createElement } from './utils.js';

createElement();

const TASK_COUNT = 20;
const tripMenu = document.querySelector('.trip-main');
const siteMenu = tripMenu.querySelector('.trip-controls__navigation');
const siteFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const tripEventsList = document.querySelector('.trip-events__list');


const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
render(tripEvents, createFormTemplate(tasks[1]), 'afterbegin');
render(tripEvents, createEditFormTemplate(tasks[0]), 'afterbegin');
render(siteMenu, createSiteMenuTemplate(), 'beforeend');

let totalPrice = 0;
const totalPath = [];

for (let i = 0; i < tasks.length; i++) {
  totalPrice += tasks[i].basicPrice;
  totalPath.push(tasks[i].destination.name);
}

render(tripMenu, createTripPriceTemplate(totalPrice), 'afterbegin');
render(tripMenu, createTripPathTemplate(totalPath), 'afterbegin');
render(siteFilters, createFiltersTemplate(), 'beforebegin');
render(tripEventsList, createSortEventsTemplate(), 'beforebegin');


for (let i = 0; i < tasks.length; i++) {
  render(tripEventsList, createPathFormTemplate(tasks[i]), 'beforeend');
}
