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

const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export { getRandomInteger, getRandomIntegerMultiplesFive, renderTemplate, createElement, isEscEvent };
