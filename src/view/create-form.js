import AbstractView from './abstract.js';
import { createFormTemplate } from '../form-template.js';

export default class NewForm extends AbstractView {
  constructor(tasks) {
    super();
    this._tasks = tasks;
    this._resetButtonName = 'Cancel';
  }

  getTemplate() {
    return createFormTemplate(this._tasks, this._resetButtonName);
  }
}
