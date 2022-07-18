import { r } from './r';

export const replaceQuoteMarksToken = (match) => {
  return match.replace(r`^"`, `“`).replace(r`"$`, `“`);
};
