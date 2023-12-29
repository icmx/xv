import { pipe } from '#/lib/common';
import { escape } from './escape';
import { mapAsterisks } from './mapAsterisks';
import { mapTypography } from './mapTypography';
import { mapUnderscores } from './mapUnderscores';
import { normalize } from './normalize';

/**
 * Parse `alt` property of xkcd comic structure
 *
 * @param {string} title
 * @returns {string}
 */
export const parseAltProperty = pipe(
  normalize,
  escape,
  mapAsterisks,
  mapUnderscores,
  mapTypography
);
