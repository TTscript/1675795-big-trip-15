import dayjs from 'dayjs';
import { generateTypes, generateOffer } from './generate-offer.js';
import { generateDestination } from './generate-destination.js';
import { generateBasicPrice } from './generate-basic-price.js';
import { generateDate, getTimeDifference } from './generate-date.js';
import { generateFavorites } from './generate-favorites.js';

export const generatePath = () => {
  const basicPrice = generateBasicPrice();
  let dateFrom = dayjs(generateDate());
  let dateTo = dayjs(generateDate());

  if (dateFrom > dateTo) {
    [dateFrom, dateTo] = [dateTo, dateFrom];
  }

  const destination = generateDestination();
  const isFavorite = generateFavorites();
  const offers = generateOffer();
  const type = generateTypes();
  const totalPathTime = getTimeDifference(dateFrom, dateTo);

  return {
    basicPrice,
    dateFrom,
    dateTo,
    totalPathTime,
    destination,
    isFavorite,
    type,
    offers,
  };
};

