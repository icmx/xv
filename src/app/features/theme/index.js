import { ThemeController } from './ThemeController';
import { ThemeModel } from './ThemeModel';
import { ThemeView } from './ThemeView';

export const themeFeature = new ThemeController({
  model: new ThemeModel(),
  view: new ThemeView(window.document.querySelector('.xv-app')),
});
