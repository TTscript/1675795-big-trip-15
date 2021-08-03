// FUNCTION GET RANDOM INTEGER NUMBER
const getRandomInteger = (min = 0, max = 1) => {
  if (min > max) {
    [min, max] = [max, min];
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//FUNCTION GET RANDOM ROUND INTEGER
const getRandomIntegerMultiplesFive = (min = 0, max = 1) => {
  if (min > max) {
    [min, max] = [max, min];
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return (Math.round(Math.random() * (max - min + 1)) + min) * 5;
};

export {getRandomInteger, getRandomIntegerMultiplesFive};
