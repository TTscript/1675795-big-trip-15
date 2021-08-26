
import { getRandomInteger } from '../utils/common';
import { mocksConstants } from './mock-constants';

const generateRandomOffers = () => {
  const generateOffersTitles = () => mocksConstants.TITLES[getRandomInteger(0, mocksConstants.TITLES.length - 1)];
  const generateOffersBlock = () => {
    const offer = {
      title: generateOffersTitles(),
      price: getRandomInteger(0, mocksConstants.MAX_OFFER_PRICE),
    };
    return offer;
  };
  const offers = new Array(getRandomInteger(0, mocksConstants.TITLES.length - 1)).fill().map(generateOffersBlock).slice(0, getRandomInteger(1, 4));
  return offers;
};

const generateTypes = () =>  mocksConstants.TYPES[getRandomInteger(0, mocksConstants.TYPES.length - 1)];

const generateOffer = () => {
  const offer = {
    type: generateTypes(),
    offer: generateRandomOffers(),
  };
  return offer;
};

export { generateTypes, generateOffer };
