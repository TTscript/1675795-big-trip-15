import TripPresenter from './presenter/trip.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import PathsModel from './model/paths-model.js';
import Api from './api.js';
import { UpdateType } from './constants.js';
import { render } from './utils/render.js';
import SiteMenuView from './view/site-menu.js';
import { RenderPosition } from './utils/render.js';
import StatisticsView from './view/statistics-view.js';

const tripMenu = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');
const tripNav = tripMenu.querySelector('.trip-controls__navigation');
const filtersRendering = document.querySelector('.trip-controls__filters');

const api = new Api();
const pathsModel = new PathsModel();
const filterModel = new FilterModel();
const tripPresenter = new TripPresenter(tripMenu, tripEvents, tripNav, pathsModel, filterModel, api);
const filterPresenter = new FilterPresenter(filtersRendering, filterModel, pathsModel);

const siteMenuComponent = new SiteMenuView();

render(tripNav, siteMenuComponent, RenderPosition.BEFOREEND);

const siteTableClick = () => {
  tripPresenter.init();
};

const siteStatsClick = () => {
  tripPresenter.destroy();
  render(tripEvents, new StatisticsView(pathsModel.getPaths()), RenderPosition.AFTERBEGIN);
};

siteMenuComponent.setTableClickHandler(siteTableClick);
siteMenuComponent.setStatsClickHandler(siteStatsClick);
tripPresenter.init();
filterPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPath();
});

api.getPaths()
  .then((paths) => {
    pathsModel.setPaths(UpdateType.INIT, paths);
  })
  .catch(() => {
    pathsModel.setPaths(UpdateType.INIT, []);
  });

