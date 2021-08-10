const tripEvents = document.querySelector('.trip-events');

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

const createElement = () => {
  const createdElement = document.createElement('ul');
  createdElement.classList.add('trip-events__list');
  tripEvents.appendChild(createdElement);
};

export {getRandomInteger, getRandomIntegerMultiplesFive, createElement};
