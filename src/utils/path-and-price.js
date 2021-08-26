import { constants } from '../constants.js';
const getTotalPrice = () => {
  let totalPrice = 0;
  constants.tasks.forEach((task) => {
    totalPrice += task.basicPrice;
  });
  return totalPrice;
};

const getTotalPathes = () => {
  const totalPathes = [];
  constants.tasks.forEach((task) => {
    totalPathes.push(task.destination.name);
  });
  return totalPathes;
};

export { getTotalPrice, getTotalPathes };
