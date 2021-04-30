import { Jeox } from './Jeox';

export const extend = (...plugins) => {
  Object.assign(Jeox.prototype, ...plugins);
};
