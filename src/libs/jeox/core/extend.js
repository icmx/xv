import Jeox from './Jeox';

const extend = (...plugins) => {
  Object.assign(Jeox.prototype, ...plugins);
};

export default extend;
