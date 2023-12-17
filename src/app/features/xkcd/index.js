import { XkcdApi } from './XkcdApi';
import { XkcdController } from './XkcdController';
import { XkcdModel } from './XkcdModel';
import { XkcdView } from './XkcdView';

export const xkcdFeature = new XkcdController({
  model: new XkcdModel(new XkcdApi('/api/comics/xkcd')),
  view: new XkcdView(window.document.querySelector('.xv-app')),
});
