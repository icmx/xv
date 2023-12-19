import { isArray } from '#/lib/common';

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
