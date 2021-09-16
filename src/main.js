import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import PathsModel from './model/paths-model.js';
import { constants } from './constants.js';

const tripMenu = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');
const tripNav = tripMenu.querySelector('.trip-controls__navigation');
const filtersRendering = document.querySelector('.trip-controls__filters');

const pathsModel = new PathsModel();
pathsModel.setPaths(constants.paths);

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(tripMenu, tripEvents, tripNav, pathsModel, filterModel);
const filterPresenter = new FilterPresenter(filtersRendering, filterModel, pathsModel);

tripPresenter.init();
filterPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createTask();
});
