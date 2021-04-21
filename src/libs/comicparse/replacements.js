import { replaceDoubleToken, replaceToken } from './replacers';
import { isRepeated } from './utils/isRepeated';

export const lessThan = { search: /</gm, replace: '&lt;' };
export const moreThan = { search: />/gm, replace: '&gt;' };

export const repeatedSpace = { search: / +/g, replace: ' ' };

export const doubleDash = {
  search: /-{2,}/g,
  replace: (match) => (isRepeated(match, '-', 3) ? match : '—'),
};

export const surroundingWhitespace = {
  search: /^\s+|\s+$/g,
  replace: '',
};

export const roundBracketsToken = {
  search: /\(\([\s\S]*?\)\)|\([\s\S]*?\)\)|\(\([\s\S]*?\)/g,
  replace: (match) => replaceDoubleToken(match, '(', ')', 'i'),
};

export const curlyBracketsToken = {
  search: /\{\{[\s\S]*?\}\}|\{[\s\S]*?\}\}|\{\{[\s\S]*?\}/g,
  replace: '',
};

export const squareBracketsToken = {
  search: /\[\[[\s\S]*?\]\]|\[[\s\S]*?\]\]|\[\[[\s\S]*?\]/g,
  replace: (match) => replaceDoubleToken(match, '[', ']', 'i'),
};

export const angleBracketsToken = {
  search: /&lt;&lt;[\s\S]*?&gt;&gt;/g,
  replace: (match) => replaceDoubleToken(match, '&lt;', '&gt;', 'b'),
};

export const asterisksToken = {
  search: /\*(\w|\s)+\*/g,
  replace: (match) =>
    isRepeated(match, '*') ? match : replaceToken(match, '*', 'b'),
};

export const underscoresToken = {
  search: /_(\w+)_/g,
  replace: (match) =>
    isRepeated(match, '_') ? match : replaceToken(match, '_', 'u'),
};

export const dash = { search: / - /g, replace: '—' };
export const arrowRight = { search: /-&gt;/g, replace: '→' };
export const arrowLeft = { search: /&lt;-/g, replace: '←' };
export const quote = { search: /"/g, replace: '“' };
export const ellipsis = { search: /(\.{3}|(\. ){3})/g, replace: '…' };
export const linebreak = { search: /\n+/g, replace: '<br /><br />' };

export const cleanupSet = [repeatedSpace, surroundingWhitespace];

export const escapesSet = [lessThan, moreThan];

export const tokensSet = [
  roundBracketsToken,
  curlyBracketsToken,
  squareBracketsToken,
  angleBracketsToken,
  asterisksToken,
  underscoresToken,
];

export const typographicsSet = [
  dash,
  arrowRight,
  arrowLeft,
  quote,
  ellipsis,
  linebreak,
  doubleDash,
];
