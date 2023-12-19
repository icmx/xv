import { r } from '#/lib/common';

export const replaceQuoteMarksToken = (match) => {
  return match.replace(r`^"`, `“`).replace(r`"$`, `“`);
};
