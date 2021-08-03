import dayjs from 'dayjs';
import { getRandomInteger, getRandomIntegerMultiplesFive } from './util.js';

const MAX_PRICE = 15000;
const MAX_QUANTITY_DESCRIPTIONS = 4;
const MAX_DAYS_GAP = 14;
const MAX_RANDOM_PHOTOS = 10000;
const MAX_PHOTOS_ARRAY_ITEMS = 5;

//FUNCTION GENERATE DESCRIPTION
const generateDescription = () => {
  const descriptions = [
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

  const filterDescription = descriptions.filter( (element) => Boolean(getRandomInteger(0, 1)) === true ? element : false);

  return filterDescription.slice(0, MAX_QUANTITY_DESCRIPTIONS).join(' ');
};

//FUNCTION GENERATE ROUTE TYPE
const generateRouteType = () => {
  const routeTypes = [
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

  const randomIndex = getRandomInteger(0, routeTypes.length - 1);

  return routeTypes[randomIndex];
};

//FUNCTION GENERATE POINT OF DESTINATION
const generatePointOfDestination = () => {
  const cities = [
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

  return cities[getRandomInteger(0, cities.length - 1)];
};

//FUNCTION GENERATE DATE
const generateDate = () => dayjs().add(getRandomInteger(0, MAX_DAYS_GAP), 'day').toDate();

//FUNCTION GENERATE PRICE
const generatePrice = () => getRandomInteger(0, MAX_PRICE);

//FUNCTION GENERATE OFFERS
const generateOffers = () => {
  const offers = {
    luggage: getRandomIntegerMultiplesFive(4, 12),
    comfort: getRandomIntegerMultiplesFive(16, 20),
    meal: getRandomIntegerMultiplesFive(2, 3),
    seats: getRandomIntegerMultiplesFive(1, 2),
    travel: getRandomIntegerMultiplesFive(6, 8),
  };

  return offers;
};

//FUNCTION GENERATE PHOTOS
const generatePhotos = () => {
  const generateRandomPhoto = () => `http://picsum.photos/248/152?r=${getRandomInteger(0, MAX_RANDOM_PHOTOS)}`;
  return new Array(getRandomInteger(0, MAX_PHOTOS_ARRAY_ITEMS)).fill().map(generateRandomPhoto);
};

//FUNCTION GENERATE TASK
const generateTask = () => {
  const price = generatePrice();
  let startDate = dayjs(generateDate());
  let endDate = dayjs(generateDate());
  const offers = generateOffers();
  if (startDate > endDate) {
    [startDate, endDate] = [endDate, startDate];
  }
  const photos = generatePhotos();


  return {
    routeType: generateRouteType(),
    startDate,
    endDate,
    price,
    offers,
    pointOfDestination: generatePointOfDestination(),
    description: generateDescription(),
    photos,
  };
};

export {generateTask};

