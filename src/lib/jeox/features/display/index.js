import { isBoolean, isObject } from '../../utils';

export const display = {
  display(option) {
    const isDisplaying = isBoolean(option);
    const isSetting =
      isObject(option) &&
      (option.showClassName !== undefined ||
        option.hideClassName !== undefined);

    if (isDisplaying) {
      const { showClassName, hideClassName } = this.storage.get(
        'display'
      );

      if (showClassName) {
        this.toggleClass(showClassName, option);
      }

      if (hideClassName) {
        this.toggleClass(hideClassName, !option);
      }

      return this;
    }

    if (isSetting) {
      this.storage.set('display', option);

      return this;
    }

    throw new Error(`Display option must be boolean or object`);
  },

  show() {
    this.display(true);

    return this;
  },

  hide() {
    this.display(false);

    return this;
  },
};
