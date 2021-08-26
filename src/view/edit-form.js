import AbstractView from './abstract.js';
import { createFormTemplate } from '../form-template.js';

export default class EditForm extends AbstractView {
  constructor(tasks) {
    super();
    this._tasks = tasks;
    this._resetButtonName = 'Delete';
    this._clickHandler = this._clickHandler.bind(this);
    this._formHandler = this._formHandler.bind(this);
  }

  getTemplate() {
    return createFormTemplate(this._tasks, this._resetButtonName);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _formHandler(evt) {
    evt.preventDefault();
    this._callback.formClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._clickHandler);
  }

  setEditSubmitHandler(callback) {
    this._callback.formClick = callback;
    this.getElement().addEventListener('submit', this._formHandler);
  }

}
