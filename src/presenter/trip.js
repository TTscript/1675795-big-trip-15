import { RenderPostition, render } from '../utils/render.js';
import { constants } from '../constants';
import SiteMenuView from '../view/site-menu.js';
import FilterView from '../view/filters.js';
import TripPathView from '../view/trip-path.js';
import TripPriceView from '../view/trip-price.js';
import SortView from '../view/sort.js';
import EmptyListView from '../view/empty-pathes-list.js';
import { getTotalPrice, getTotalPathes } from '../utils/path-and-price.js';
import PathPresenter from './path.js';
import { updateItem } from '../utils/common.js';
import { sortByDefault, sortByDay, sortByTime, sortByPrice } from '../utils/path-util.js';
import { SortType } from '../constants';

export default class Trip {
  constructor(tripMenu, tripEvents, tripNav, filters) {
    this._tripMenu = tripMenu;
    this._tripEvents = tripEvents;
    this._tripNav = tripNav;
    this._filters = filters;
    this._pathListComponent = constants.pathListComponent;
    this._pathPresenters = new Map();
    this._currentSortType = SortType.DEFAULT;

    this._siteMenu = new SiteMenuView();
    this._siteFilters = new FilterView();
    this._emptyList = new EmptyListView();
    this._tripPrice = new TripPriceView(getTotalPrice());
    this._tripPath = new TripPathView(getTotalPathes());
    this._sort = new SortView();

    this._handlePathChange = this._handlePathChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(paths) {
    this._paths = paths.slice();
    this._sourcePaths = paths.slice();

    this._renderSiteMenu();
    this._renderSiteFilters();

    this._renderTrip();
  }

  _sortPaths(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this._paths.sort(sortByDay);
        break;
      case SortType.TIME:
        this._paths.sort(sortByTime);
        break;
      case SortType.PRICE:
        this._paths.sort(sortByPrice);
        break;
      default:
        this._paths = this._sourcePaths.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortPaths(sortType);
    this._clearPathList();
    this._renderPaths();
  }

  _renderSort() {
    render(this._pathListComponent, this._sort, RenderPostition.BEFOREBEGIN);
    this._sort.setSortTypeChangeHandler(this._handleSortTypeChange);
    if (this._currentSortType === SortType.DEFAULT) {
      this._paths.sort(sortByDefault);
    }
  }

  _handleModeChange() {
    this._pathPresenters.forEach((presenter) => presenter.resetView());
  }

  _handlePathChange(updatedPath) {
    this._paths = updateItem(this._paths, updatedPath);
    this._pathPresenters.get(updatedPath.id).init(updatedPath);
  }

  _renderSiteMenu() {
    render(this._tripNav, this._siteMenu, RenderPostition.BEFOREEND);
  }

  _renderTripPrice() {
    render(this._tripMenu, this._tripPrice, RenderPostition.AFTERBEGIN);
  }

  _renderTripPaths() {
    render(this._tripMenu, this._tripPath, RenderPostition.AFTERBEGIN);
  }

  _renderPathList() {
    render(this._tripEvents, constants.pathListComponent, RenderPostition.AFTERBEGIN);
  }

  _renderPath(path) {
    const pathPresenter = new PathPresenter(this._pathListComponent, this._handlePathChange, this._handleModeChange);
    pathPresenter.init(path);
    this._pathPresenters.set(path.id, pathPresenter);
  }

  _renderPaths(from, to) {
    this._paths
      .slice(from, to)
      .forEach((path) => this._renderPath(path));
  }

  _clearPathList() {
    this._pathPresenters.forEach((presenter) => presenter.destroy());
    this._pathPresenters.clear();
  }

  _renderSiteFilters() {
    render(this._filters, this._siteFilters, RenderPostition.BEFOREEND);
  }

  _renderEmptyList() {
    render(this._tripEvents, this._emptyList, RenderPostition.AFTERBEGIN);
  }

  _renderTrip() {
    if (!this._paths.length) {
      this._renderEmptyList();
    }

    this._renderTripPrice();
    this._renderTripPaths();
    this._renderPathList();
    this._renderSort();
    this._renderPaths();
  }
}


