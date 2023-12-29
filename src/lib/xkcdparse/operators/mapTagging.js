import { createReplacer } from '../utils/createReplacer';

const bTagReplacer = createReplacer({
  startPattern: '&lt;b&gt;',
  endPattern: '&lt;\\/b&gt;',
  onTrimmed: (trimmed) => `<strong>${trimmed}</strong>`,
});

const iTagReplacer = createReplacer({
  startPattern: '&lt;i&gt;',
  endPattern: '&lt;\\/i&gt;',
  onTrimmed: (trimmed) => `<em>${trimmed}</em>`,
});

const uTagReplacer = createReplacer({
  startPattern: '&lt;u&gt;',
  endPattern: '&lt;\\/u&gt;',
  onTrimmed: (trimmed) => `<u>${trimmed}</u>`,
});

/**
 * Map HTML `<b>`, `<i>` and `<u>` escaped tags to actual tags.
 *
 * This is for intended tags from source (e.g. from original xkcd)
 *
 * @param {string} source
 * @returns {string}
 */
export const mapTagging = (source) => {
  return source
    .replace(/&lt;\s?b\s?&gt;[\s\S]*?&lt;\s?\/b\s?&gt;/, bTagReplacer)
    .replace(/&lt;\s?i\s?&gt;[\s\S]*?&lt;\s?\/i\s?&gt;/, iTagReplacer)
    .replace(/&lt;\s?u\s?&gt;[\s\S]*?&lt;\s?\/u\s?&gt;/, uTagReplacer);
};
