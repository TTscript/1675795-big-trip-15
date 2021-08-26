import { RenderPostition, render } from '../utils/render.js';
import { constants } from '../constants';
import SiteMenuView from '../view/site-menu.js';
import FilterView from '../view/filters.js';
import TripPathView from '../view/trip-path.js';
import TripPriceView from '../view/trip-price.js';
import SortView from '../view/sort.js';
import EmptyListView from '../view/empty-pathes-list.js';
import { getTotalPrice, getTotalPathes } from '../utils/path-and-price.js';
import PathView from './path.js';
import { updateItem } from '../utils/common.js';

export default class Trip {
  constructor(tripMenu, tripEvents, tripNav, filters) {
    this._tripMenu = tripMenu;
    this._tripEvents = tripEvents;
    this._tripNav = tripNav;
    this._filters = filters;
    this._pathListComponent = constants.pathListComponent;
    this._pathPresenter = new Map();

    this._siteMenu = new SiteMenuView();
    this._siteFilters = new FilterView();
    this._emptyList = new EmptyListView();
    this._tripPrice = new TripPriceView(getTotalPrice());
    this._tripPath = new TripPathView(getTotalPathes());
    this._sort = new SortView();

    this._handleTaskChange = this._handleTaskChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(tasks) {
    this._tasks = tasks.slice();

    this._renderSiteMenu();
    this._renderSiteFilters();

    this._renderTrip();
    this._renderPathes(tasks);
  }

  _handleModeChange() {
    this._pathPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleTaskChange(updatedTask) {
    this._tasks = updateItem(this._tasks, updatedTask);
    this._pathPresenter.get(updatedTask.id).init(updatedTask);
  }

  _renderSiteMenu() {
    render(this._tripNav, this._siteMenu, RenderPostition.BEFOREEND);
  }

  _renderTripPrice() {
    render(this._tripMenu, this._tripPrice, RenderPostition.AFTERBEGIN);
  }

  _renderTripPathes() {
    render(this._tripMenu, this._tripPath, RenderPostition.AFTERBEGIN);
  }

  _renderPathList() {
    render(this._tripEvents, constants.pathListComponent, RenderPostition.AFTERBEGIN);
  }

  _renderPath(task) {
    const pathPresenter = new PathView(this._pathListComponent, this._handleTaskChange, this._handleModeChange);
    pathPresenter.init(task);
    this._pathPresenter.set(task.id, pathPresenter);
  }

  _renderPathes(from, to) {
    this._tasks
      .slice(from, to)
      .forEach((task) => this._renderPath(task));
  }

  _clearPathList() {
    this._pathPresenter.forEach((presenter) => presenter.destroy());
    this._pathPresenter.clear();
  }

  _renderSort() {
    render(this._pathListComponent, this._sort, RenderPostition.BEFOREBEGIN);
  }

  _renderSiteFilters() {
    render(this._filters, this._siteFilters, RenderPostition.BEFOREEND);
  }

  _renderEmptyList() {
    render(this._tripEvents, this._emptyList, RenderPostition.AFTERBEGIN);
  }

  _renderTrip() {
    if (this._tasks.length === 0) {
      this._renderEmptyList();
    } else {
      this._renderTripPrice();
      this._renderTripPathes();
      this._renderPathList();
      this._renderSort();
    }
  }
}


