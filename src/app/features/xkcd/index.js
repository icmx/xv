import { XkcdApi } from './XkcdApi';
import { XkcdModel } from './XkcdModel';
import { XkcdView } from './XkcdView';
import { XkcdController } from './XkcdController';

export const xkcdFeature = new XkcdController({
  model: new XkcdModel(new XkcdApi('/api/comics/xkcd')),
  view: new XkcdView(window.document.querySelector('.xv-app')),
});
