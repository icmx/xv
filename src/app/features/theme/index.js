import { ThemeModel as Model } from './ThemeModel';
import { ThemeView as View } from './ThemeView';
import { ThemeController as Controller } from './ThemeController';

export default new Controller({
  model: new Model(),
  view: new View(window.document.querySelector('.xv-app')),
});

// export default { Model, View, Controller };
