import { Model } from '../../core/Model';
import { EVENT_THEME } from './constants';

export class ThemeModel extends Model {
  constructor() {
    super();
  }

  setTheme(name) {
    localStorage.setItem('xv-theme', name);

    this.emit(EVENT_THEME, name);
  }
}
