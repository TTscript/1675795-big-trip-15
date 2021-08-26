import EditFormView from '../view/edit-form.js';
import PathFormView from '../view/path-form.js';
import { RenderPostition, render, replace, remove } from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Path {
  constructor(pathListContainer, changeData, changeMode) {
    this._pathListContainer = pathListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pathComponent = null;
    this._pathEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handlePathClick = this._handlePathClick.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(task) {
    this._task = task;

    const prevPathComponent = this._pathComponent;
    const prevPathEditComponent = this._pathEditComponent;

    this._pathComponent = new PathFormView(task);
    this._editComponent = new EditFormView(task);

    this._pathComponent.setPathClickHandler(this._handlePathClick);
    this._editComponent.setEditSubmitHandler(this._handleFormSubmit);
    this._editComponent.setEditClickHandler(this._handleEditClick);
    this._pathComponent.setPathFavoriteClickHandler(this._handleFavoriteClick);

    if (prevPathComponent === null || prevPathEditComponent === null) {
      render(this._pathListContainer, this._pathComponent, RenderPostition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pathComponent, prevPathComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pathEditComponent, prevPathEditComponent);
    }

    remove(prevPathComponent);
    remove(prevPathEditComponent);
  }

  destroy() {
    remove(this._pathComponent);
    remove(this._pathEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPath();
    }
  }

  _replacePathToForm() {
    replace(this._editComponent, this._pathComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPath() {
    replace(this._pathComponent, this._editComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToPath();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._task,
        {
          isFavorite: !this._task.isFavorite,
        },
      ),
    );
  }

  _handlePathClick() {
    this._replacePathToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToPath();
  }

  _handleEditClick() {
    this._replaceFormToPath();
  }
}
