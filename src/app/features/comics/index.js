import ComicModel from './ComicModel';
import ComicView from './ComicView';
import ComicController from './ComicController';

import ComicApi from './ComicApi';

const comics = new ComicController({
  model: new ComicModel(new ComicApi('/api/comics')),
  view: new ComicView(window.document.querySelector('.xv-app')),
});

export default comics;
