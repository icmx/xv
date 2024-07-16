import { createReplacer } from '../utils/createReplacer';

const replacer = createReplacer({
  startPattern: '_',
  endPattern: '_',
  onTrimmed: (trimmed) => `<u>${trimmed}</u>`,
});

/**
 * Replace underscores markup to bold font, i.e. `_text_` to
 * `<u>text</u>`.
 *
 * @param {string} source
 * @returns {string}
 */
export const mapUnderscores = (source) => {
  return source.replaceAll(/_(\w+)_/g, replacer);
};
