import { RenderPosition, render, remove } from '../utils/render.js';
import FilterView from '../view/filters-view.js';
import TripPathsAndPricesView from '../view/trip-and-path-view.js';
import SortView from '../view/sort.js';
import { getTotalPrice, getTotalPathes } from '../utils/path-and-price.js';
import PathPresenter, {State as PathPresenterViewState} from './path.js';
import { sortByDefault, sortByDay, sortByTime, sortByPrice } from '../utils/path-utils.js';
import { SortType, UpdateType, UserAction, constants, FilterType } from '../constants';
import { filter } from '../utils/filters-utils.js';
import EmptyListView from '../view/empty-pathes-list.js';
import PathNewPresenter from './new-path-presenter.js';
import LoadingView from '../view/loading.js';

const createPropertiesNewEventButton = (key) => {
  const keyWord = key;
  const button = document.querySelector('.trip-main__event-add-btn');
  if (keyWord === 'disabled') {
    button.setAttribute('disabled', '');
  }

  if (keyWord === 'enabled') {
    button.removeAttribute('disabled');
  }
};

export default class Trip {
  constructor(tripMenu, tripEvents, tripNav, pathsModel, filterModel, api) {
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
    this._isLoading = true;

    this._api = api;

    this._siteFilters = new FilterView();
    this._noPathComponent = null;
    // this._tripPathsAndPrices = new TripPathsAndPricesView();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pathsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._pathNewPresenter = new PathNewPresenter(this._pathListComponent, this._handleViewAction);
  }

  init() {
    this._pathsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._renderTrip();
  }

  destroy() {
    this._clearTrip({resetSortType: true});

    remove(this._pathListComponent);

    this._pathsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createPath(callback) {
    this._pathNewPresenter.init(callback);
  }

  _getPaths() {
    this._filterType = this._filterModel.getFilter();
    const paths = this._pathsModel.getPaths();
    const filtredPaths = filter[this._filterType](paths);

    switch (this._currentSortType) {
      case SortType.DEFAULT:
        return filtredPaths.sort(sortByDefault);
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
    this._renderTrip(this._getPaths());
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
        this._pathPresenters.get(update.id).setViewState(PathPresenterViewState.SAVING);
        this._api.updatePath(update)
          .then((response) => {
            this._pathsModel.updatePath(updateType, response);
          })
          .catch(() => {
            this._pathPresenters.get(update.id).setViewState(PathPresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_PATH:
        this._pathNewPresenter.setSaving();
        this._api.addPath(update)
          .then((response) => {
            this._pathsModel.addPath(updateType, response);
          })
          .catch(() => {
            this._pathNewPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_PATH:
        this._pathPresenters.get(update.id).setViewState(PathPresenterViewState.DELETING);
        this._api.deletePath(update)
          .then(() => {
            this._pathsModel.deletePath(updateType, update);
          })
          .catch(() => {
            this._pathPresenter.get(update.id).setViewState(PathPresenterViewState.ABORTING);
          });
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
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        createPropertiesNewEventButton('enabled');
        this._renderTrip();
        break;
    }
  }

  _renderTripPathsAndPrice(path) {
    this._tripPathsAndPrices = new TripPathsAndPricesView(path, getTotalPathes(path), getTotalPrice(path));
    render(this._tripMenu, this._tripPathsAndPrices, RenderPosition.AFTERBEGIN);
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

  _renderLoading() {
    render(this._tripEvents, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _clearTrip({resetSortType = false} = {}) {
    this._pathNewPresenter.destroy();
    this._pathPresenters.forEach((presenter) => presenter.destroy());
    this._pathPresenters.clear();

    remove(this._sortComponent);
    remove(this._pathListComponent);
    remove(this._loadingComponent);
    remove(this._tripPathsAndPrices);

    if (this._noPathComponent) {
      remove(this._noPathComponent);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderTrip() {
    if (this._isLoading) {
      createPropertiesNewEventButton('disabled');
      this._renderLoading();
      return;
    }
    const paths = this._getPaths();
    if (!paths.length) {
      this._renderEmptyList();
    }

    this._renderTripPathsAndPrice(paths);
    this._renderPathList();
    this._renderSort();
    this._renderPaths(paths);
  }
}


