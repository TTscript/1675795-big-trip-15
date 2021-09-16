import EditFormView from '../view/edit-form.js';
import {nanoid} from 'nanoid';
import {remove, render, RenderPosition} from '../utils/render.js';
import { UserAction, UpdateType } from '../constants.js';

export default class PathNew {
  constructor(pathListContainer, changeData) {
    this._pathListContainer = pathListContainer;
    this._changeData = changeData;

    this._pathEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._pathEditComponent !== null) {
      return;
    }

    this._pathEditComponent = new EditFormView();
    this._pathEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pathEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._pathListContainer, this._pathEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._pathEditComponent === null) {
      return;
    }

    remove(this._pathEditComponent);
    this._pathEditComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _handleFormSubmit(path) {
    this._changeData(
      UserAction.ADD_PATH,
      UpdateType.MINOR,
      // Пока у нас нет сервера, который бы после сохранения
      // выдывал честный id задачи, нам нужно позаботиться об этом самим
      Object.assign({id: nanoid()}, path),
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}
