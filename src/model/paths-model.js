import AbstractObserver from '../utils/abstract-observer';

export default class Paths extends AbstractObserver {
  constructor() {
    super();
    this._paths = [];
  }

  setPaths(paths) {
    this._paths = paths.slice();
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
}
