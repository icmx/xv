import { isArray } from '../utils/isArray';

export const animation = {
  animate(classNames, state = true) {
    const toggleClass = (className) => {
      this.toggleClass(className, state);
    };

    if (isArray(classNames)) {
      classNames.forEach(toggleClass);
    } else {
      toggleClass(classNames);
    }

    return this;
  },
};
