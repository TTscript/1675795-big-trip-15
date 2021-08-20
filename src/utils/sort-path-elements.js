export const sortPathElements = () => {
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
