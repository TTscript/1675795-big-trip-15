import Abstract from '../view/abstract.js';
import { getRandomInteger } from './common.js';
import { Offer } from '../constants.js';
import { mocksConstants } from '../mocks/mock-constants.js';

const RenderPostition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const render = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPostition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPostition.BEFOREEND:
      container.append(child);
      break;
    case RenderPostition.BEFOREBEGIN:
      container.before(child);
      break;
    case RenderPostition.AFTEREND:
      container.after(child);
      break;
  }
};

const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};

const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

const createOffersRender = (offers) => {
  const offersBlock = [];

  for (let i = 0; i < offers.offer.length; i++) {
    let bend = '';
    switch (offers.offer[i].title) {
      case Offer.BUSINESS:
        bend = 'business-class';
        break;
      case Offer.RADIO:
        bend = 'radio-station';
        break;
      case Offer.UBER:
        bend = 'order-uber';
        break;
      case Offer.LUGGAGE:
        bend = 'luggage';
        break;
      case Offer.CAR:
        bend = 'rent-car';
        break;
      case Offer.BREAKFAST:
        bend = 'breakfast';
        break;
      case Offer.COMFORT:
        bend = 'comfort';
        break;
      case Offer.SEAT:
        bend = 'seats';
        break;
      case Offer.TRAIN:
        bend = 'train';
        break;
      case Offer.MEAL:
        bend = 'meal';
        break;
    }

    const isChecked = () => Boolean(getRandomInteger(0, 1)) === true ? 'checked' : '';

    offersBlock.push(`<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${bend}-1" type="checkbox" name="event-offer-${bend}" ${isChecked()}>
    <label class="event__offer-label" for="event-offer-${bend}-1">
      <span class="event__offer-title">${offers.offer[i].title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offers.offer[i].price}</span>
    </label>
  </div>`);
  }
  return offersBlock.join('');
};

const createPhotos = (destination) => {
  const photos = [];
  destination.pictures.forEach((photo) => {
    photos.push(`<img class="event__photo" src=${photo.src}>`);
  });

  return photos.join('');
};

const createDataListOptions = () => {
  const dataListOptions = [];
  for (let i = 0; i < mocksConstants.CITIES.length; i++) {
    const cities = `<option value="${mocksConstants.CITIES[i]}"></option>`;
    dataListOptions.push(cities);
  }
  return dataListOptions;
};

export { RenderPostition, render, replace, remove, createOffersRender, createPhotos, createDataListOptions };
