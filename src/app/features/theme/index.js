import ThemeModel from './ThemeModel';
import ThemeView from './ThemeView';
import ThemeController from './ThemeController';

const theme = new ThemeController({
  model: new ThemeModel(),
  view: new ThemeView(window.document.querySelector('.xv-app')),
});

export default theme;
