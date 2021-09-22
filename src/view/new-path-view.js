import SmartView from './smart.js';
import { createFormTemplate } from './form-template.js';
import { generateOffer } from '../mocks/generate-offer.js';
import { generateRandomPhoto } from '../mocks/generate-destination.js';
import flatpickr from 'flatpickr';
import rangePlugin from '../../node_modules/flatpickr/dist/plugins/rangePlugin';
import 'flatpickr/dist/flatpickr.min.css';

export default class NewPath extends SmartView {
  constructor(path) {
    super();
    this._data = NewPath.parsePathToData(path);
    this._datepicker = null;

    this._resetButtonName = 'Cancel';
    this._clickHandler = this._clickHandler.bind(this);
    this._newFormHandler = this._newFormHandler.bind(this);
    this._changeTypeClickHandler = this._changeTypeClickHandler.bind(this);
    this._changeDestinationClickHandler = this._changeDestinationClickHandler.bind(this);
    this._dueDateChangeHandler = this._dueDateChangeHandler.bind(this);
    this._formCancelClickHandler = this._formCancelClickHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  getTemplate() {
    return createFormTemplate(this._data, this._resetButtonName, 'new');
  }

  _formCancelClickHandler(evt) {
    evt.preventDefault();
    this._callback.cancelClick();
    this.getElement().reset();
  }

  setCancelClickHandler(callback) {
    this._callback.cancelClick = callback;
    this.getElement().querySelector(`.event__${this._resetButtonName.toLowerCase()}-btn`).addEventListener('click', this._formCancelClickHandler);
  }

  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  _setDatepicker() {
    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }

    this._datepicker = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/Y H:i',
        defaultDate: this._data.dataFrom,
        onClose: this._dueDateChangeHandler,
        'plugins': [new rangePlugin({ input: this.getElement().querySelector('#event-end-time-1')})],
      },
    );
  }

  _dueDateChangeHandler() {
    this.updateData({
      dateFrom: this.getElement().querySelector('#event-start-time-1').value,
      dateTo: this.getElement().querySelector('#event-end-time-1').value,
    });
  }

  reset(path) {
    this.updateData(
      NewPath.parsePathToData(path),
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setEditClickHandler(this._callback.editClick);
    this.setNewSubmitHandler(this._callback.formClick);
    this._setDatepicker();
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
      {
      },
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
        // {description: generateDescription(mocksConstants.MAX_QUANTITY_GENERAL_DESCRIPTION)},
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

  _newFormHandler(evt) {
    evt.preventDefault();
    this._callback.formClick(NewPath.parseDataToPath(this._data));
  }

  setNewSubmitHandler(callback) {
    this._callback.formClick = callback;
    this.getElement().addEventListener('submit', this._newFormHandler);
  }
}
