import { createReplacer } from '../utils/createReplacer';

const replacer = createReplacer({
  startPattern: '\\(',
  endPattern: '\\)',
  onTrimmed: (trimmed) => `<em>(${trimmed})</em>`,
});

/**
 * Replace round brackets markup to curly font, i.e. `((text))` to
 * `<em>(text)</em>`.
 *
 * @param {string} source
 * @returns {string}
 */
export const mapRoundBrackets = (source) => {
  return source.replace(
    /\(\([^\(\)]*?\)\)|\([^\(\)]*?\)\)|\(\([^\(\)]*?\)/g,
    replacer
  );
};
