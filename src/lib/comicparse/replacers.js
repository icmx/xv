import { re } from './utils/re';

export const replaceToken = (match, token, htmlTagName) => {
  return match
    .replace(re`^\\${token}`, `<${htmlTagName}>`)
    .replace(re`\\${token}$`, `</${htmlTagName}>`);
};

export const replaceDoubleToken = (
  match,
  startToken,
  endToken,
  htmlTagName
) => {
  return match
    .replace(re`^(\\${startToken})+ {0,}`, `<${htmlTagName}>`)
    .replace(re` {0,}(\\${endToken})+$`, `</${htmlTagName}>`);
};
