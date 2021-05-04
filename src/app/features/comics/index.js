import XkcdModel from './XkcdModel';
import XkcdView from './XkcdView';
import XkcdController from './XkcdController';

import XkcdApi from './XkcdApi';

const comics = new XkcdController({
  model: new XkcdModel(new XkcdApi('/api/comics')),
  view: new XkcdView(window.document.querySelector('.xv-app')),
});

export default comics;
