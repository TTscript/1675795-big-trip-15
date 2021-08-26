import dayjs from 'dayjs';
import { generateTypes, generateOffer } from './generate-offer.js';
import { generateDestination } from './generate-destination.js';
import { generateBasicPrice } from './generate-basic-price.js';
import { generateDate } from './generate-date.js';
import { generateFavorites } from './generate-favorites.js';
import { nanoid } from 'nanoid';

const generateTask = () => {
  const basicPrice = generateBasicPrice();
  let dateFrom = dayjs(generateDate());
  let dateTo = dayjs(generateDate());

  if (dateFrom > dateTo) {
    [dateFrom, dateTo] = [dateTo, dateFrom];
  }

  const destination = generateDestination();
  const id = nanoid();
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

