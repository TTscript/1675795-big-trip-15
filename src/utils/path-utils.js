import dayjs from 'dayjs';

const sortByDefault = (pathA, pathB) => dayjs(pathA.dateFrom).diff(dayjs(pathB.dateFrom));

const sortByDay = (pathA, pathB) => dayjs(pathB.dateFrom).diff(dayjs(pathA.dateFrom));

const sortByPrice = (pathA, pathB) => pathB.basicPrice - pathA.basicPrice;

const sortByTime = (pathA, pathB) =>  pathB.totalPathTime.replace(['H'], '.').replace(['M'], '') - pathA.totalPathTime.replace(['H'], '.').replace(['M'], '');

export { sortByDefault, sortByDay, sortByTime, sortByPrice };

