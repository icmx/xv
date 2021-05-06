import AboutController from './AboutController';
import AboutView from './AboutView';

const about = new AboutController({
  view: new AboutView(window.document.querySelector('.xv-app')),
});

export default about;
