/**
 * Combine multiple functions into one. Functions will be called from
 * first to last one.
 *
 * @param {Function} firstOperator First operator function
 * @param {...Function} restOperators Rest operator fonctions (if any)
 * @returns {Function}
 */
export const pipe = (firstOperator, ...restOperators) => {
  return restOperators.reduce(
    (result, current) =>
      (...rest) =>
        current(result(...rest)),
    firstOperator
  );
};
