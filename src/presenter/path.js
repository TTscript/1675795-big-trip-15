import EditFormView from '../view/edit-form.js';
import PathFormView from '../view/path-form.js';
import { RenderPosition, render, replace, remove } from '../utils/render.js';
import { isEscPressed } from '../utils/common.js';
import { UserAction, UpdateType } from '../constants.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

export default class Path {
  constructor(pathListContainer, changeData, changeMode) {
    this._pathListContainer = pathListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pathComponent = null;
    this._editComponent = null;
    this._mode = Mode.DEFAULT;

    this._handlePathClick = this._handlePathClick.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
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
    this._editComponent.setDeleteClickHandler(this._handleDeleteClick);


    if (previousPathComponent === null) {
      render(this._pathListContainer, this._pathComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pathComponent, previousPathComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._pathComponent, previousPathComponent);
      this._mode === Mode.DEFAULT;
    }

    remove(previousPathComponent);
  }

  setViewState(state) {
    if (this._mode === Mode.DEFAULT) {
      return;
    }

    const resetFormState = () => {
      this._editComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    switch (state) {
      case State.SAVING:
        this._editComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this._editComponent.updateData({
          isDisabled: true,
          isDeleting: true,
        });
        break;
      case State.ABORTING:
        this._pathComponent.shake(resetFormState);
        this._editComponent.shake(resetFormState);
        break;
    }
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

  _handleDeleteClick(path) {
    this._changeData(
      UserAction.DELETE_PATH,
      UpdateType.MINOR,
      path,
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_PATH,
      UpdateType.MINOR,
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

  _handleFormSubmit(update) {
    this._changeData(
      UserAction.UPDATE_PATH,
      UpdateType.MINOR,
      update,
    );
  }

  _handleEditClick() {
    this._editComponent.reset(this._path);
    this._replaceFormToPath();
  }
}
