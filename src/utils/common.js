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

const applyLowerCase = (value) => {
  switch(value) {
    case 'Taxi':
      return 'taxi';
    case 'Bus':
      return 'bus';
    case 'Train':
      return 'train';
    case 'Ship':
      return 'ship';
    case 'Transport':
      return 'transport';
    case 'Drive':
      return 'drive';
    case 'Flight':
      return 'flight';
    case 'Check-in':
      return 'check-in';
    case 'Sightseeing':
      return 'sightseeing';
    case 'Restaurant':
      return 'restaurant';
  }
};

export { getRandomInteger, getRandomIntegerMultiplesFive, renderTemplate, createElement, isEscPressed, applyLowerCase };
