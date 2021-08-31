import { getRandomInteger } from '../utils/common';
import { mocksConstants } from './mock-constants';
import dayjs from 'dayjs';

const generateDate = () => dayjs().hour(getRandomInteger(0, 23)).minute(getRandomInteger(0, 59)).add(getRandomInteger(0, mocksConstants.MAX_DAYS_GAP), 'day').toDate();

const getTimeDifference = (dateFrom, dateTo) => {
  const getHourDifference = () => dateFrom.format('HH') - dateTo.format('HH');
  const getMinuteDifference = () => dateFrom.format('mm') - dateTo.format('mm');
  return `${Math.abs(getHourDifference())}H${Math.abs(getMinuteDifference())}M`;
};

export { generateDate, getTimeDifference };
