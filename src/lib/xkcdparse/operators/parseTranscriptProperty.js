import { pipe } from '#/lib/common';
import { escape } from './escape';
import { mapAngleBrackets } from './mapAngleBrackets';
import { mapAsterisks } from './mapAsterisks';
import { mapCurlyBrackets } from './mapCurlyBrackets';
import { mapLinebreaks } from './mapLinebreaks';
import { mapRoundBrackets } from './mapRoundBrackets';
import { mapSquareBrackets } from './mapSquareBrackets';
import { mapTagging } from './mapTagging';
import { mapTypography } from './mapTypography';
import { mapUnderscores } from './mapUnderscores';
import { normalize } from './normalize';

/**
 * Parse `transcript` property of xkcd comic structure
 *
 * @param {string} title
 * @returns {string}
 */
export const parseTranscriptProperty = pipe(
  normalize,
  escape,
  mapCurlyBrackets,
  mapSquareBrackets,
  mapRoundBrackets,
  mapAngleBrackets,
  mapAsterisks,
  mapUnderscores,
  mapTagging,
  mapLinebreaks,
  mapTypography
);
