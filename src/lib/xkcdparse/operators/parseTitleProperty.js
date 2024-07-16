import { pipe } from '#/lib/common';
import { escape } from './escape';
import { mapTypography } from './mapTypography';
import { normalize } from './normalize';

/**
 * Parse `title` property of xkcd comic structure
 *
 * @param {string} title
 * @returns {string}
 */
export const parseTitleProperty = pipe(
  normalize,
  escape,
  mapTypography
);
