import { FilterType } from '../constants.js';
import dayjs from 'dayjs';

const isPathInPast = ((dueDate) => dayjs().isAfter(dueDate, 'D'));
const isPathTheSame = (dueDate) => dayjs(dueDate).isSame(dayjs(), 'D');
const isPathInFuture = ((dueDate) => dayjs().isBefore(dueDate, 'D'));
const isEverything = (() => isPathTheSame || isPathInFuture);

export const filter = {
  [FilterType.EVERYTHING]: (paths) => paths.filter((path) => isEverything(path.dateFrom)),
  [FilterType.FUTURE]: (paths) => paths.filter((path) => isPathInFuture(path.dateFrom)),
  [FilterType.PAST]: (paths) => paths.filter((path) => isPathInPast(path.dateFrom)),
};


