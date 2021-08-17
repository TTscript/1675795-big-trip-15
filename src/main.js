import SiteMenuView from './view/site-menu.js';
import TripPathView from './view/trip-path.js';
import TripPriceView from './view/trip-price.js';
import FilterView from './view/filters.js';
import SortView from './view/sort.js';
import EditFormView from './view/edit-form.js';
import PathFormView from './view/path-form.js';
import EmptyListView from './view/empty-pathes-list.js';
import './generate-task.js';
import { render, RenderPostition, sortPathElements } from './utils.js';
import { constants } from './constants';

render(constants.siteMenu, new SiteMenuView().getElement(), RenderPostition.BEFOREEND);
render(constants.siteFilters, new FilterView().getElement(), RenderPostition.BEFOREEND);

let totalPrice = 0;
const totalPathes = [];

constants.tasks.forEach((task) => {
  totalPrice += task.basicPrice;
  totalPathes.push(task.destination.name);
});

if (constants.tasks.length === 0) {
  render(constants.tripEvents, new EmptyListView().getElement(), RenderPostition.AFTERBEGIN);
} else {
  render(constants.tripMenu, new TripPriceView(totalPrice).getElement(), RenderPostition.AFTERBEGIN);
  render(constants.tripMenu, new TripPathView(totalPathes).getElement(), RenderPostition.AFTERBEGIN);
  render(constants.tripEvents, constants.pathListComponent.getElement(), RenderPostition.AFTERBEGIN);
  render(constants.pathListComponent.getElement(), new SortView().getElement(), RenderPostition.BEFOREBEGIN);
}

const renderPath = (pathList, task) => {
  const pathFormComponent = new PathFormView(task);
  const editFormComponent = new EditFormView(task);

  const replacePathFormToEditForm = () => {
    pathList.replaceChild(editFormComponent.getElement(), pathFormComponent.getElement());
  };

  const replaceEditFormToPathForm = () => {
    pathList.replaceChild(pathFormComponent.getElement(), editFormComponent.getElement());
  };

  const onClickPopupForm = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      replaceEditFormToPathForm();
      document.removeEventListener('click', onClickPopupForm);
    }
  };

  pathFormComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePathFormToEditForm();
  });

  editFormComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceEditFormToPathForm();
    window.addEventListener('click', onClickPopupForm);
  });

  editFormComponent.getElement().addEventListener('submit', (event) => {
    event.preventDefault();
    replaceEditFormToPathForm();
  });

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceEditFormToPathForm();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };
  window.addEventListener('keydown', () => {
    replaceEditFormToPathForm();
    window.addEventListener('keydown', onEscKeyDown);
  });

  render(pathList, pathFormComponent.getElement(), RenderPostition.BEFOREEND);
};

constants.tasks.forEach((task) => {
  renderPath(constants.pathListComponent.getElement(), task);
});

sortPathElements();

