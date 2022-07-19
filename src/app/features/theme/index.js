import { ThemeModel } from './ThemeModel';
import { ThemeView } from './ThemeView';
import { ThemeController } from './ThemeController';

export const themeFeature = new ThemeController({
  model: new ThemeModel(),
  view: new ThemeView(window.document.querySelector('.xv-app')),
});
