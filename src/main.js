import SiteMenuView from './view/site-menu.js';
import TripPathView from './view/trip-path.js';
import TripPriceView from './view/trip-price.js';
import FilterView from './view/filters.js';
import SortView from './view/sort.js';
import EditFormView from './view/edit-form.js';
import PathFormView from './view/path-form.js';
import EmptyListView from './view/empty-pathes-list.js';
import './generate-task.js';
import { constants } from './constants';
import { sortPathElements } from './utils/sort-path-elements.js';
import { RenderPostition, render, replace } from './utils/render.js';
import { isEscEvent } from './utils/common.js';

render(constants.siteMenu, new SiteMenuView(), RenderPostition.BEFOREEND);
render(constants.siteFilters, new FilterView(), RenderPostition.BEFOREEND);

let totalPrice = 0;
const totalPathes = [];

constants.tasks.forEach((task) => {
  totalPrice += task.basicPrice;
  totalPathes.push(task.destination.name);
});

if (constants.tasks.length === 0) {
  render(constants.tripEvents, new EmptyListView(), RenderPostition.AFTERBEGIN);
} else {
  render(constants.tripMenu, new TripPriceView(totalPrice), RenderPostition.AFTERBEGIN);
  render(constants.tripMenu, new TripPathView(totalPathes), RenderPostition.AFTERBEGIN);
  render(constants.tripEvents, constants.pathListComponent, RenderPostition.AFTERBEGIN);
  render(constants.pathListComponent, new SortView(), RenderPostition.BEFOREBEGIN);
}

const renderPath = (pathList, task) => {
  const pathFormComponent = new PathFormView(task);
  const editFormComponent = new EditFormView(task);

  const replacePathFormToEditForm = () => {
    replace(editFormComponent, pathFormComponent);
  };

  const replaceEditFormToPathForm = () => {
    replace(pathFormComponent, editFormComponent);
  };

  const onClickPopupForm = () => {
    replaceEditFormToPathForm();
    editFormComponent.removeEventListener('click', onClickPopupForm);
  };

  const onEscKeyDown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      replaceEditFormToPathForm();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  pathFormComponent.setPathClickHandler(() => {
    replacePathFormToEditForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  editFormComponent.setEditClickHandler(() => {
    replaceEditFormToPathForm();
    editFormComponent.addEventListener('click', onClickPopupForm);
  });

  editFormComponent.setEditSubmitHandler(() => {
    replaceEditFormToPathForm();
    editFormComponent.addEventListener('submit', onClickPopupForm);
  });

  render(pathList, pathFormComponent.getElement(), RenderPostition.BEFOREEND);
};

constants.tasks.forEach((task) => {
  renderPath(constants.pathListComponent.getElement(), task);
});

sortPathElements();

