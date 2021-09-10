
import TripView from './presenter/trip.js';
import { constants } from './constants.js';

const tripMenu = document.querySelector('.trip-main');
const tripEvents = document.querySelector('.trip-events');
const tripNav = tripMenu.querySelector('.trip-controls__navigation');
const filters = document.querySelector('.trip-controls__filters');

const tripPresenter = new TripView(tripMenu, tripEvents, tripNav, filters);
tripPresenter.init(constants.paths);

