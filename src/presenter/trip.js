import { RenderPosition, render, remove } from '../utils/render.js';
import SiteMenuView from '../view/site-menu.js';
import FilterView from '../view/filters-view.js';
import TripPathView from '../view/trip-path.js';
import TripPriceView from '../view/trip-price.js';
import SortView from '../view/sort.js';
import { getTotalPrice, getTotalPathes } from '../utils/path-and-price.js';
import PathPresenter from './path.js';
import { sortByDefault, sortByDay, sortByTime, sortByPrice } from '../utils/path-utils.js';
import { SortType, UpdateType, UserAction, constants, FilterType } from '../constants';
import { filter } from '../utils/filters-utils.js';
import EmptyListView from '../view/empty-pathes-list.js';
import PathNewPresenter from './new-path-presenter.js';

export default class Trip {
  constructor(tripMenu, tripEvents, tripNav, pathsModel, filterModel) {
    this._pathsModel = pathsModel;
    this._filterModel = filterModel;
    this._tripMenu = tripMenu;
    this._tripEvents = tripEvents;
    this._tripNav = tripNav;
    this._pathListComponent = constants.pathListComponent;
    this._pathPresenters = new Map();
    this._currentSortType = SortType.DEFAULT;
    this._filterType = FilterType.EVERYTHING;
    this._sortComponent = null;

    this._siteMenu = new SiteMenuView();
    this._siteFilters = new FilterView();
    this._noPathComponent = null;
    this._tripPrice = new TripPriceView(getTotalPrice());
    this._tripPath = new TripPathView(getTotalPathes());

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pathsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._pathNewPresenter = new PathNewPresenter(this._pathListComponent, this._handleViewAction);
  }

  init() {
    this._renderSiteMenu();

    this._renderTrip();
  }

  createTask() {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pathNewPresenter.init();
  }

  _getPaths() {
    this._filterType = this._filterModel.getFilter();
    const paths = this._pathsModel.getPaths();
    const filtredPaths = filter[this._filterType](paths);

    switch (this._currentSortType) {
      case SortType.DAY:
        return filtredPaths.sort(sortByDay);
      case SortType.TIME:
        return filtredPaths.sort(sortByTime);
      case SortType.PRICE:
        return filtredPaths.sort(sortByPrice);
    }
    return filtredPaths;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip(this._getPaths().sort(sortByDay));
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._pathListComponent, this._sortComponent, RenderPosition.BEFOREBEGIN);

    if (this._currentSortType === SortType.DEFAULT) {
      this._getPaths().sort(sortByDefault);
    }
  }

  _handleModeChange() {
    this._pathNewPresenter.destroy();
    this._pathPresenters.forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_PATH:
        this._pathsModel.updatePath(updateType, update);
        break;
      case UserAction.ADD_PATH:
        this._pathsModel.addPath(updateType, update);
        break;
      case UserAction.DELETE_PATH:
        this._pathsModel.deletePath(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pathPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
    }
  }

  _renderSiteMenu() {
    render(this._tripNav, this._siteMenu, RenderPosition.BEFOREEND);
  }

  _renderTripPrice() {
    render(this._tripMenu, this._tripPrice, RenderPosition.AFTERBEGIN);
  }

  _renderTripPaths() {
    render(this._tripMenu, this._tripPath, RenderPosition.AFTERBEGIN);
  }

  _renderPathList() {
    render(this._tripEvents, constants.pathListComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPath(path) {
    const pathPresenter = new PathPresenter(this._pathListComponent, this._handleViewAction, this._handleModeChange);
    pathPresenter.init(path);
    this._pathPresenters.set(path.id, pathPresenter);
  }

  _renderPaths(paths) {
    paths.forEach((path) => this._renderPath(path));
  }

  _renderEmptyList() {
    this._noPathComponent = new EmptyListView(this._filterType);
    render(this._tripEvents, this._noPathComponent, RenderPosition.AFTERBEGIN);
  }

  _clearTrip({resetSortType = false} = {}) {
    this._pathNewPresenter.destroy();
    this._pathPresenters.forEach((presenter) => presenter.destroy());
    this._pathPresenters.clear();

    remove(this._sortComponent);
    remove(this._pathListComponent);

    if (this._noPathComponent) {
      remove(this._noPathComponent);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderTrip() {
    const paths = this._getPaths();
    if (!paths.length) {
      this._renderEmptyList();
    }

    this._renderTripPrice();
    this._renderTripPaths();
    this._renderPathList();
    this._renderSort();
    this._renderPaths(paths);
  }
}


