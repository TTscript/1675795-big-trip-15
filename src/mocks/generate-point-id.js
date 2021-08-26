import { getRandomInteger } from '../utils/common';
import { mocksConstants } from './mock-constants';

export const generatePointId = () => `point--${getRandomInteger(0, mocksConstants.MAX_POINT_ID_NUMBER)}`;
