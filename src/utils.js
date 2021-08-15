const getRandomInteger = (min = 0, max = 1) => {
  if (min > max) {
    [min, max] = [max, min];
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomIntegerMultiplesFive = (min = 0, max = 1) => {
  if (min > max) {
    [min, max] = [max, min];
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return (Math.round(Math.random() * (max - min + 1)) + min) * 5;
};

const RenderPostition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPostition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPostition.BEFOREEND:
      container.append(element);
      break;
    case RenderPostition.BEFOREBEGIN:
      container.before(element);
      break;
    case RenderPostition.AFTEREND:
      container.after(element);
      break;
  }
};
const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const sortPathElements = () => {
  const tripEventsList = document.querySelector('.trip-events__list');
  const tripEventsItem = document.querySelectorAll('.trip-events__item');
  const priceButton = document.querySelector('#sort-price');
  const dayButton = document.querySelector('#sort-day');

  dayButton.addEventListener('click', () => {
    const days = [...tripEventsItem].sort((a, b) => a.children[0].children[0].dateTime.replace(/\D/g, '') - b.children[0].children[0].dateTime.replace(/\D/g, ''));
    tripEventsList.innerHTML = '';
    for (const day of days) {
      tripEventsList.appendChild(day);
    }
  });

  priceButton.addEventListener('click', () => {
    const prices = [...tripEventsItem].sort((a, b) => a.children[0].children[4].textContent.replace(/\D/g, '') - b.children[0].children[4].textContent.replace(/\D/g, ''));
    tripEventsList.innerHTML = '';
    for (const price of prices) {
      tripEventsList.appendChild(price);
    }
  });
};

export {getRandomInteger, getRandomIntegerMultiplesFive, RenderPostition, render, renderTemplate, createElement, sortPathElements};
