import { re } from './re';

export const replaceQuoteMarksToken = (match) => {
  return match.replace(re`^"`, `“`).replace(re`"$`, `“`);
};
