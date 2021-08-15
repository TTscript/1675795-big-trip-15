import dayjs from 'dayjs';
import { getRandomInteger } from './utils.js';

const MAX_PRICE = 5000;
const MAX_QUANTITY_GENERAL_DESCRIPTION = 4;
const MAX_QUANTITY_PHOTO_DESCRIPTION = 1;
const MAX_DAYS_GAP = 14;
const MAX_RANDOM_PHOTOS = 10000;
const MAX_PHOTOS_ARRAY_ITEMS = 5;
const MAX_POINT_ID_NUMBER = 100;
const MAX_OFFER_PRICE = 200;
const DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];
const CITIES = [
  'Las Vegas',
  'Sedona',
  'Rome',
  'Athens',
  'Berlin',
  'London',
  'Paris',
  'Tokyo',
  'Singapore',
  'Barcelona',
  'Madrid',
  'Toronto',
  'San Francisco',
  'Amsterdam',
  'Prague',
  'Sydney',
];
const TYPES = [
  'Check-in',
  'Sightseeing',
  'Restaurant',
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
];
const TITLES = [
  'Upgrade to a business class',
  'Choose the radio station',
  'Order Uber',
  'Add luggage',
  'Rent a car',
  'Add breakfast',
  'Switch to comfort',
  'Choose seats',
  'Travel by train',
  'Add meal',
];

const generateBasicPrice = () => getRandomInteger(0, MAX_PRICE);

const generateDate = () => dayjs().add(getRandomInteger(0, MAX_DAYS_GAP), 'day').toDate();

const generateDescription = (maxDescription) => {
  const description = DESCRIPTION.filter( (element) => Boolean(getRandomInteger(0, 1)) === true ? element : false);
  return description.slice(0, maxDescription).join(' ');
};

const generateCities = () => CITIES[getRandomInteger(0, CITIES.length - 1)];

const generateRandomPhoto = () => {
  const randomPhoto = () => {
    const photo = {
      src: `http://picsum.photos/248/152?r=${getRandomInteger(0, MAX_RANDOM_PHOTOS)}`,
      description: generateDescription(MAX_QUANTITY_PHOTO_DESCRIPTION),
    };
    return photo;
  };
  return new Array(getRandomInteger(0, MAX_PHOTOS_ARRAY_ITEMS)).fill().map(randomPhoto);
};

const generateDestination = () => {
  const destination = {
    description: generateDescription(MAX_QUANTITY_GENERAL_DESCRIPTION),
    name: generateCities(),
    pictures: generateRandomPhoto(),
  };
  return destination;
};

const generatePointId = () => `point--${getRandomInteger(0, MAX_POINT_ID_NUMBER)}`;

const generateFavorites = () => Boolean(getRandomInteger(0, 1));

const generateRandomOffers = () => {
  const generateOffersTitles = () => TITLES[getRandomInteger(0, TITLES.length - 1)];
  const generateOffersBlock = () => {
    const offer = {
      title: generateOffersTitles(),
      price: getRandomInteger(0, MAX_OFFER_PRICE),
    };
    return offer;
  };
  const offers = new Array(getRandomInteger(0, TITLES.length - 1)).fill().map(generateOffersBlock).slice(0, getRandomInteger(1, 4));
  return offers;
};

const generateTypes = () =>  TYPES[getRandomInteger(0, TYPES.length - 1)];

const generateOffer = () => {
  const offer = {
    type: generateTypes(),
    offer: generateRandomOffers(),
  };
  return offer;
};

const generateTask = () => {
  const basicPrice = generateBasicPrice();
  let dateFrom = dayjs(generateDate());
  let dateTo = dayjs(generateDate());

  if (dateFrom > dateTo) {
    [dateFrom, dateTo] = [dateTo, dateFrom];
  }

  const destination = generateDestination();
  const id = generatePointId();
  const isFavorite = generateFavorites();
  const offers = generateOffer();
  const type = generateTypes();

  return {
    basicPrice,
    dateFrom,
    dateTo,
    destination,
    id,
    isFavorite,
    type,
    offers,
  };
};

export {generateTask};

