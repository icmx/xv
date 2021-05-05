import Jeox from '../core/Jeox';

/**
 * Determine if value is a Jeox instance.
 * @param {?} value
 * @returns {boolean}
 */
const isJeox = (value) => {
  return value instanceof Jeox;
};

export default isJeox;
