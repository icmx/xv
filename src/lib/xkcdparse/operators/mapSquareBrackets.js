import { createReplacer } from '../utils/createReplacer';

const replacer = createReplacer({
  startPattern: '\\[',
  endPattern: '\\]',
  onTrimmed: (trimmed) => `<em>[${trimmed}]</em>`,
});

/**
 * Replace square brackets markup to curly font, i.e. `[[text]]` to
 * `<em>(text)</em>`.
 *
 * @param {string} source
 * @returns {string}
 */
export const mapSquareBrackets = (source) => {
  return source.replaceAll(
    /\[\[[\s\S]*?\]\]|\[[\s\S]*?\]\]|\[\[[\s\S]*?\]/g,
    replacer
  );
};
