import Abstract from '../view/abstract.js';
import { mocksConstants } from '../mocks/mock-constants.js';
import dayjs from 'dayjs';

const RenderPosition = {
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
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
    case RenderPosition.BEFOREBEGIN:
      container.before(child);
      break;
    case RenderPosition.AFTEREND:
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
  if (component === null) {
    return;
  }

  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};

const createOffersRender = (offers) => {
  const offersBlock = [];

  for (let i = 0; i < offers.length; i++) {
    offersBlock.push(`<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offers[i].title}-1" type="checkbox" name="event-offer-${offers[i].title}">
    <label class="event__offer-label" for="event-offer-${offers[i].title}-1">
      <span class="event__offer-title">${offers[i].title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offers[i].price}</span>
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

const getTimeDifference = (dateFrom, dateTo) => {
  const getHourDifference = () => dayjs().format('HH') - dayjs(dateTo).format('HH');
  const getMinuteDifference = () => dayjs(dateFrom).format('mm') - dayjs(dateTo).format('mm');
  const getDayDifference = () => dayjs(dateFrom).format('DD') - dayjs(dateTo).format('DD');


  if (Math.abs(getHourDifference()) < 1) {
    return `${Math.abs(getMinuteDifference())}M`;
  } else if (`${Math.abs(getDayDifference()) < 1}`) {
    return `${Math.abs(getHourDifference())}H${Math.abs(getMinuteDifference())}M`;
  } else if (`${Math.abs(getDayDifference()) > 1}`) {
    return `${Math.abs(getDayDifference())}D${Math.abs(getHourDifference())}H${Math.abs(getMinuteDifference())}M`;
  }
};

export { RenderPosition, render, replace, remove, createOffersRender, createPhotos, createDataListOptions, getTimeDifference };
