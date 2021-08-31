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

const isEscPressed = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export { getRandomInteger, getRandomIntegerMultiplesFive, renderTemplate, createElement, isEscPressed, updateItem };
