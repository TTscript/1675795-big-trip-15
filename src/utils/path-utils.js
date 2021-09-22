import dayjs from 'dayjs';
import { getTimeDifference } from './render';

const sortByDefault = (pathA, pathB) => dayjs(pathA.dateFrom).diff(dayjs(pathB.dateFrom));

const sortByDay = (pathA, pathB) => dayjs(pathB.dateFrom).diff(dayjs(pathA.dateFrom));

const sortByPrice = (pathA, pathB) => pathB.basicPrice - pathA.basicPrice;

const sortByTime = (pathA, pathB) => getTimeDifference(pathB.dateFrom, pathB.dateTo).replace(['H'], '.').replace(['M'], '')
  - getTimeDifference( pathA.dateFrom, pathA.dateTo).replace(['H'], '.').replace(['M'], '');

export { sortByDefault, sortByDay, sortByTime, sortByPrice };

