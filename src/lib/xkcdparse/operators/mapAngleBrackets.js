import { createReplacer } from '../utils/createReplacer';

const replacer = createReplacer({
  startPattern: '&lt;',
  endPattern: '&gt;',
  onTrimmed: (trimmed) => `<strong>${trimmed}</strong>`,
});

/**
 * Replace angle brackets markup to bold font, i.e. `<<text>>` to
 * `<strong>text</strong>`.
 *
 * @param {string} source
 * @returns {string}
 */
export const mapAngleBrackets = (source) => {
  return source.replace(
    /&lt;&lt;[\s\S]*?&gt;&gt;|(&lt;){2,}[\s\S]*?&gt;|&lt;[\s\S]*?(&gt;){2,}/gm,
    replacer
  );
};
