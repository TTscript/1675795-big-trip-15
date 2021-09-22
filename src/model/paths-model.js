import AbstractObserver from '../utils/abstract-observer';
import dayjs from 'dayjs';

export default class Paths extends AbstractObserver {
  constructor() {
    super();
    this._paths = [];
  }

  setPaths(updateType, paths) {
    this._paths = paths.slice();

    this._notify(updateType);
  }

  getPaths() {
    return this._paths;
  }

  updatePath(updateType, update) {
    const index = this._paths.findIndex((path) => path.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting path');
    }

    this._paths = [
      ...this._paths.slice(0, index),
      update,
      ...this._paths.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPath(updateType, update) {
    this._paths = [
      update,
      ...this._paths,
    ];

    this._notify(updateType, update);
  }

  deletePath(updateType, update) {

    const index = this._paths.findIndex((path) => path.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting path');
    }

    this._paths = [
      ...this._paths.slice(0, index),
      ...this._paths.slice(index + 1),
    ];

    this._notify(updateType);
  }

  static adaptToClient(path) {
    // console.log(path['date_from']);
    const adaptedPath = Object.assign(
      {},
      path,
      {
        basicPrice: path['base_price'],
        dateFrom: path['date_from'],
        dateTo: path['date_to'],
        isFavorite: path['is_favorite'],
      },
    );

    delete adaptedPath['base_price'];
    delete adaptedPath['date_from'];
    delete adaptedPath['date_to'];
    delete adaptedPath['is_favorite'];

    return adaptedPath;
  }

  static adaptToServer(path) {
    const adaptedPath = Object.assign(
      {},
      path,
      {
        'base_price': path.basicPrice,
        'date_from': new Date(path.dateFrom),
        'date_to': new Date(path.dateTo),
        'is_favorite': path.isFavorite,
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedPath.basicPrice;
    delete adaptedPath.dateFrom;
    delete adaptedPath.dateTo;
    delete adaptedPath.isFavorite;

    return adaptedPath;
  }
}
