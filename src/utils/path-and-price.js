const getTotalPrice = (paths) => {
  let totalPrice = 0;
  paths.forEach((path) => {
    totalPrice += path.basicPrice;
  });
  return totalPrice;
};

const getTotalPathes = (paths) => {
  const totalPathes = [];
  paths.forEach((path) => {
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
