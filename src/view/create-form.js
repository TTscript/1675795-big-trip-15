import { createElement } from '../utils';
import { createFormTemplate } from '../form-template.js';

export default class NewForm {
  constructor(tasks) {
    this._tasks = tasks;
    this._resetButtonName = 'Cancel',
    this._element = null;
  }

  getTemplate() {
    return createFormTemplate(this._tasks, this._resetButtonName);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
