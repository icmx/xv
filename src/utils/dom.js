/**
 * Shorthand to standart `querySelector`, returns the first element
 * that is a descendant of node that matches selector.
 */
export const $ = (selector, parent = window.document) =>
  parent.querySelector(selector);

export default { $ };
