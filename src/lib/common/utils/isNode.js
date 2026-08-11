import { isInt } from './isInt';
import { toInt } from './toInt';

/**
 * Determine if value is a DOM node.
 * @param {?} value
 * @returns {boolean}
 */
export const isNode = (value) => {
  const int = toInt(value.nodeType);

  return int > 0 || int < 12;
};
