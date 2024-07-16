/**
 * Convert a Date instance into a common string formatted like
 * `Day of week, month, date, year`, e.g. `Friday, July 2, 2010`.
 *
 * @param {Date} date
 * @returns {string}
 */
export const getDateString = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'full',
}).format;
