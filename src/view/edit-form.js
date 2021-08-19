import AbstractView from './abstract.js';
import { createFormTemplate } from '../form-template.js';

export default class EditForm extends AbstractView {
  constructor(tasks) {
    super();
    this._tasks = tasks;
    this._resetButtonName = 'Delete';
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createFormTemplate(this._tasks, this._resetButtonName);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._editClickHandler);
  }

  setEditSubmitHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().addEventListener('submit', this._editClickHandler);
  }

}
