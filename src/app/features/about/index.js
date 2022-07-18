import { AboutController } from './AboutController';
import { AboutView } from './AboutView';

export const aboutFeature = new AboutController({
  view: new AboutView(window.document.querySelector('.xv-app')),
});
