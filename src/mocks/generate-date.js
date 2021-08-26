import { getRandomInteger } from '../utils/common';
import { mocksConstants } from './mock-constants';
import dayjs from 'dayjs';

export const generateDate = () => dayjs().add(getRandomInteger(0, mocksConstants.MAX_DAYS_GAP), 'day').toDate();
