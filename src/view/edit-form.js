import SmartView from './smart.js';
import { createFormTemplate } from '../form-template.js';
import { generateOffer } from '../mocks/generate-offer.js';
import { generateDescription, generateRandomPhoto } from '../mocks/generate-destination.js';
import { mocksConstants } from '../mocks/mock-constants.js';

export default class EditForm extends SmartView {
  constructor(path) {
    super();
    this._data = EditForm.parsePathToData(path);
    this._resetButtonName = 'Delete';
    this._clickHandler = this._clickHandler.bind(this);
    this._formHandler = this._formHandler.bind(this);
    this._changeTypeClickHandler = this._changeTypeClickHandler.bind(this);
    this._changeDestinationClickHandler = this._changeDestinationClickHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createFormTemplate(this._data, this._resetButtonName);
  }

  reset(path) {
    this.updateData(
      EditForm.parsePathToData(path),
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setEditClickHandler(this._callback.editClick);
    this.setEditSubmitHandler(this._callback.formClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._changeDestinationClickHandler);
    this.getElement()
      .querySelector('.event__type-list')
      .addEventListener('change', this._changeTypeClickHandler);
  }

  static parsePathToData(path) {
    return Object.assign(
      {},
      path,
      {},
    );
  }

  static parseDataToPath(data) {
    data = Object.assign({}, data);
    return data;
  }

  _changeTypeClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      offers: generateOffer(),
    });
  }

  _changeDestinationClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      destination: Object.assign(
        {},
        this._data.destination,
        {name: evt.target.value},
        {pictures: generateRandomPhoto()},
        {description: generateDescription(mocksConstants.MAX_QUANTITY_GENERAL_DESCRIPTION)},
      ),
    });
  }

  setChangeDestinationClickHandler() {
    this.getElement().querySelector('.event__input--destination').addEventListener('change', this._changeDestinationClickHandler);
  }

  setChangeTypeClickHandler(callback) {
    this._callback.changeType = callback;
    this.getElement().querySelector('.event__type-list').addEventListener('change', this._changeTypeClickHandler);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._clickHandler);
  }

  _formHandler(evt) {
    evt.preventDefault();
    this._callback.formClick(EditForm.parseDataToPath(this._data));
  }

  setEditSubmitHandler(callback) {
    this._callback.formClick = callback;
    this.getElement().addEventListener('submit', this._formHandler);
  }
}
