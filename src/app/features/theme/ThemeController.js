import { Controller } from './../../core/Controller';
import { EVENT_THEME } from './constants';

export class ThemeController extends Controller {
  constructor({ model, view }) {
    super({ model, view });
  }

  start() {
    this.model.on(EVENT_THEME, (name) => this.view.setTheme(name));

    this.view.on(EVENT_THEME, (name) => this.model.setTheme(name));
  }
}
