/**
 * Determine if value is an Array and includes at least one element.
 * @param {?} value
 * @returns boolean
 */
export const isEmptyArray = (value) => {
  return !value.length || value.length === 0;
};
