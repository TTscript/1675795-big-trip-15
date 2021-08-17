import { createElement } from '../utils.js';
import { createFormTemplate } from '../form-template.js';

export default class EditForm {
  constructor(tasks) {
    this._tasks = tasks;
    this._resetButtonName = 'Delete',
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
