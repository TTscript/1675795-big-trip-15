import { createSiteMenuTemplate } from './view/site-menu.js';
import { createTripPathTemplate } from './view/trip-path.js';
import { createTripPriceTemplate } from './view/trip-price.js';
import { createFiltersTemplate } from './view/filters.js';
import { createSortEventsTemplate } from './view/sort.js';
import { createFormTemplate } from './view/create-form.js';
import { createEditFormTemplate } from './view/edit-form.js';
import { createPathFormTemplate } from './view/path-form.js';
import { generateTask } from './generateData.js';
import './generateData.js';

const TASK_COUNT = 20;
const tripMenu = document.querySelector('.trip-main');
const siteMenu = tripMenu.querySelector('.trip-controls__navigation');
const siteFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const tasks = new Array(TASK_COUNT).fill().map(generateTask);

//RENDER
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(tripEvents, createEditFormTemplate(tasks[0]), 'beforeend');
render(siteMenu, createSiteMenuTemplate(), 'beforeend');
render(tripMenu, createTripPriceTemplate(), 'afterbegin');
render(tripMenu, createTripPathTemplate(), 'afterbegin');
render(siteFilters, createFiltersTemplate(), 'beforeend');
render(tripEvents, createSortEventsTemplate(), 'beforeend');
render(tripEvents, createFormTemplate(tasks[0]), 'beforeend');

for (let i = 0; i < TASK_COUNT; i++) {
  render(tripEvents, createPathFormTemplate(tasks[i]), 'beforeend');
}

