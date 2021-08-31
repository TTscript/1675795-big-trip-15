import AbstractView from './abstract.js';
import { createFormTemplate } from '../form-template.js';

export default class NewForm extends AbstractView {
  constructor(paths) {
    super();
    this._paths = paths;
    this._resetButtonName = 'Cancel';
  }

  getTemplate() {
    return createFormTemplate(this._paths, this._resetButtonName);
  }
}
