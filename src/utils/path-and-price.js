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

  if (totalPathes.length > 3) {
    const fillingTotalPathes = [];
    fillingTotalPathes.push(totalPathes[0]);
    fillingTotalPathes.push('. . .');
    fillingTotalPathes.push(totalPathes[totalPathes.length - 1]);
    return fillingTotalPathes;
  }
  return totalPathes;
};

export { getTotalPrice, getTotalPathes };
