import { constants } from '../constants.js';
const getTotalPrice = () => {
  let totalPrice = 0;
  constants.paths.forEach((path) => {
    totalPrice += path.basicPrice;
  });
  return totalPrice;
};

const getTotalPathes = () => {
  const totalPathes = [];
  constants.paths.forEach((path) => {
    totalPathes.push(path.destination.name);
  });
  return totalPathes;
};

export { getTotalPrice, getTotalPathes };
