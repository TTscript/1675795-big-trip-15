import { getRandomInteger } from '../utils/common';
import { mocksConstants } from './mock-constants';

export const generateBasicPrice = () => getRandomInteger(0, mocksConstants.MAX_PRICE);
