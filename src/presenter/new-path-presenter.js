import NewPathView from '../view/new-path-view.js';
import {remove, render, RenderPosition} from '../utils/render.js';
import { UserAction, UpdateType } from '../constants.js';
// import EditFormView from '../view/edit-form.js';

export default class PathNew {
  constructor(pathListContainer, changeData) {
    this._pathListContainer = pathListContainer;
    this._changeData = changeData;

    this._newComponent = null;
    this._destroyCallback = null;

    this._handleFormSubmit = this._handleNewFormSubmit.bind(this);
    this._handleCancelClick = this._handleCancelClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(callback) {
    this._destroyCallback = callback;

    if (this._newComponent !== null) {
      return;
    }

    this._newComponent = new NewPathView();
    this._newComponent.setNewSubmitHandler(this._handleFormSubmit);
    this._newComponent.setCancelClickHandler(this._handleCancelClick);
    // this._newComponent = new EditFormView();

    render(this._pathListContainer, this._newComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  setAborting() {
    const resetFormState = () => {
      this._newComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this._newComponent.shake(resetFormState);
  }

  destroy() {
    if (this._newComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._newComponent);
    this._newComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleNewFormSubmit(path) {
    this._changeData(
      UserAction.ADD_PATH,
      UpdateType.MINOR,
      path,
    );
  }

  _handleCancelClick() {

  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }

  setSaving() {
    this._newComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }
}
