import EditFormView from '../view/edit-form.js';
import PathFormView from '../view/path-form.js';
import { RenderPostition, render, replace, remove } from '../utils/render.js';
import { isEscPressed } from '../utils/common.js';

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

  init(path) {
    this._path = path;

    const previousPathComponent = this._pathComponent;

    this._pathComponent = new PathFormView(path);
    this._editComponent = new EditFormView(path);

    this._pathComponent.setPathClickHandler(this._handlePathClick);
    this._editComponent.setEditSubmitHandler(this._handleFormSubmit);
    this._editComponent.setEditClickHandler(this._handleEditClick);
    this._pathComponent.setPathFavoriteClickHandler(this._handleFavoriteClick);
    this._editComponent.setChangeTypeClickHandler(this._handleChangeTypeClick);

    if (previousPathComponent === null) {
      render(this._pathListContainer, this._pathComponent, RenderPostition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pathComponent, previousPathComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pathEditComponent, previousPathComponent);
    }

    remove(previousPathComponent);
  }

  destroy() {
    remove(this._pathComponent);
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
    this._mode = Mode.DEFAULT;
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (isEscPressed(evt)) {
      evt.preventDefault();
      this._editComponent.reset(this._path);
      this._replaceFormToPath();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._path,
        {
          isFavorite: !this._path.isFavorite,
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
    this._editComponent.reset(this._path);
    this._replaceFormToPath();
  }
}
