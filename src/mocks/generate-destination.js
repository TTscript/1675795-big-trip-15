import { getRandomInteger } from '../utils/common';
import { mocksConstants } from './mock-constants.js';

const generateCities = () => mocksConstants.CITIES[getRandomInteger(0, mocksConstants.CITIES.length - 1)];

const generateDescription = (maxDescription) => {
  const description = mocksConstants.DESCRIPTION.filter( (element) => Boolean(getRandomInteger(0, 1)) === true ? element : false);
  return description.slice(0, maxDescription).join(' ');
};

const generateRandomPhoto = () => {
  const randomPhoto = () => {
    const photo = {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(0, mocksConstants.MAX_RANDOM_PHOTOS)}`,
      description: generateDescription(mocksConstants.MAX_QUANTITY_PHOTO_DESCRIPTION),
    };
    return photo;
  };
  return new Array(getRandomInteger(0, mocksConstants.MAX_PHOTOS_ARRAY_ITEMS)).fill().map(randomPhoto);
};

const generateDestination = () => {
  const destination = {
    description: generateDescription(mocksConstants.MAX_QUANTITY_GENERAL_DESCRIPTION),
    name: generateCities(),
    pictures: generateRandomPhoto(),
  };
  return destination;
};

export { generateDestination };
