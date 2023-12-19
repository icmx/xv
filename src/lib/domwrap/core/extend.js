import { DOMWrapper } from './DOMWrapper';

export const extend = (...plugins) => {
  Object.assign(DOMWrapper.prototype, ...plugins);
};
