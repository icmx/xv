import re from './re';

const replaceQuoteMarksToken = (match) => {
  return match.replace(re`^"`, `“`).replace(re`"$`, `“`);
};

export default replaceQuoteMarksToken;
