import AbstractView from './abstract.js';

const createPathList = () => ('<ul class="trip-events__list"></ul>');

export default class PathList extends AbstractView {
  getTemplate() {
    return createPathList();
  }
}
