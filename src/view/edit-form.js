import SmartView from './smart.js';
import { createFormTemplate } from './form-template.js';
import flatpickr from 'flatpickr';
import rangePlugin from '../../node_modules/flatpickr/dist/plugins/rangePlugin';
import 'flatpickr/dist/flatpickr.min.css';
// import { createOffersRender } from '../utils/render.js';

export default class EditForm extends SmartView {
  constructor(path) {
    super();
    this._data = EditForm.parsePathToData(path);
    this._datepicker = null;

    this._resetButtonName = 'Delete';
    this._clickHandler = this._clickHandler.bind(this);
    this._formHandler = this._formHandler.bind(this);
    this._changeTypeClickHandler = this._changeTypeClickHandler.bind(this);
    this._changeDestinationClickHandler = this._changeDestinationClickHandler.bind(this);
    this._dueDateChangeHandler = this._dueDateChangeHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._changePriceHandler = this._changePriceHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createFormTemplate(this._data, this._resetButtonName, 'edit');
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
      EditForm.parsePathToData(path),
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setEditClickHandler(this._callback.editClick);
    this.setEditSubmitHandler(this._callback.formClick);
    this._setDatepicker();
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._changeDestinationClickHandler);
    this.getElement()
      .querySelector('.event__type-list')
      .addEventListener('change', this._changeTypeClickHandler);
    this.getElement()
      .querySelector('.event__input--price')
      .addEventListener('input', this._changePriceHandler);
    this._setDatepicker();

  }

  static parsePathToData(path) {
    return Object.assign(
      {},
      path,
      {
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      },
    );
  }

  static parseDataToPath(data) {
    data = Object.assign({}, data);
    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;
    return data;
  }

  _changePriceHandler(evt) {
    evt.preventDefault();
    this.updateData({
      basicPrice: evt.target.value,
    }, true);
  }

  _changeTypeClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      // offers: createOffersRender,
    });
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EditForm.parseDataToPath(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__${this._resetButtonName.toLowerCase()}-btn`).addEventListener('click', this._formDeleteClickHandler);
  }

  _changeDestinationClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      destination: Object.assign(
        {},
        this._data.destination,
        {name: evt.target.value},
        // {pictures: generateRandomPhoto()},
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

  _formHandler(evt) {
    evt.preventDefault();
    this._callback.formClick(EditForm.parseDataToPath(this._data));
  }

  setEditSubmitHandler(callback) {
    this._callback.formClick = callback;
    this.getElement().addEventListener('submit', this._formHandler);
  }
}
