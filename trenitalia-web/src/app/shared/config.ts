import * as moment from 'moment';

export const config = Object.freeze({
  departureDate: moment().add(2, 'days').format('YYYY-MM-DDTHH:00'),
  minDate: moment().format('YYYY-MM-DD'),
  maxDate: moment().add(1, 'year').format('YYYY-MM-DD'),
  maxAdults: 6
});
