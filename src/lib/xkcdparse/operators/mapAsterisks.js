import { createReplacer } from '../utils/createReplacer';

const replacer = createReplacer({
  startPattern: '\\*',
  endPattern: '\\*',
  onTrimmed: (trimmed) => `<strong>${trimmed}</strong>`,
});

/**
 * Replace asterisks markup to bold font, i.e. `*text*` to
 * `<strong>text</strong>`.
 *
 * @param {string} source
 * @returns {string}
 */
export const mapAsterisks = (source) => {
  return source.replaceAll(/\*(\w|\s)+\*/gm, replacer);
};
