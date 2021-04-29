import { ComicModel as Model } from './ComicModel';
import { ComicView as View } from './ComicView';
import { ComicController as Controller } from './ComicController';

import { ComicApi as Api } from './ComicApi';

export default new Controller({
  model: new Model(new Api('/api/comics')),
  view: new View(window.document.querySelector('.xv-app')),
});
