// I've realised that there is a simple syntax for xkcd transcript
// messages.
//
// Tokens:
//
//   {{hidden (this is an alt text copy by the way)}}
//   [[coursive, screen description]]
//   ((coursive also, but more extra-context))
//   <<bold>>
//   *bold* also
//   _underline_
//
//  Typography rules:
//
//    \n breaks paragraphs
//    -- means em dash
//    - is em dash too, but when surrounded by spaces
//    ... is ellipsis
//    " is quotation mark
//
// There are some extra rules also:
//
//   - Tokens cannot be nested. That makes parsing WAY easier.
//   - Double tokens like ((, [[ or {{ may be misspelled like ( ... ))
//     or (( ... )
//   - There are should not be double paragraph breaks, as well as
//     leading or trailing paragraph breaks. Same for spaces.
//   - Literal < and > should be replaced by escape entities &lt; and
//     &gt;.
//
// I'm not really good at parsers theory, so for now it's just a pretty
// naive bunch of regular expressions.

const EMPTY = '';

/**
 * Shorthand to standard RegExp constructor, builds a regular
 * expression based on template string.
 */
export const rx = (strings, ...keys) => {
  const pattern = keys
    .map((value, index) => strings[index] + value)
    .join(EMPTY)
    .concat(strings[strings.length - 1]);

  return new RegExp(pattern);
};

/**
 * Checks if a `string` is actually a `character` repetition, done in
 * `count` times or more. By default, `count` is 1.
 *
 * Tests with expression like `/^*{2,}$/g`, where `*` is `character`
 * and `2` is `count`.
 */
const repeated = (string, character, count = 1) => {
  const pattern = rx`^\\${character}{${count},}$`;
  return pattern.test(string);
};

/**
 * Replaces a regular token like `*this*` or `_that_` by HTML tag
 * equivalent. Regular token characters are
 *
 *   (1) Same for start and end,
 *   (2) May be occured only once from start and end,
 *   (3) Must not have spaces after start and before end.
 *
 * That is,
 *
 *   This is valid: *example of regular tag*
 *   This is not: * example is incorrect*
 */
const replaceToken = (match, token, htmlTagName) =>
  match
    .replace(rx`^\\${token}`, `<${htmlTagName}>`)
    .replace(rx`\\${token}$`, `</${htmlTagName}>`);

/**
 * Replaces a double token like `[[this]]` or `{{ that }}` by HTML tag
 * equivalent. Double token characters are
 *
 *   (1) Different for start and end, e.g. `[[` is start and `]]` is
 *       end),
 *   (2) May be occured twice or, by a mistake, once from one side,
 *   (3) May have some spaces after start and before end like `[[   `
 *       or ` ]`.
 *
 * That is,
 *
 *   These are valid: [[example]], [[  example], [[ example many words]]
 *   These aren't: [ example ], [example many words]
 */
const replaceDoubleToken = (match, startToken, endToken, htmlTagName) =>
  match
    .replace(rx`^\\${startToken}+ {0,}`, `<${htmlTagName}>`)
    .replace(rx` {0,}\\${endToken}+$`, `</${htmlTagName}>`);

const replacements = [
  {
    search: /(\(\(.*?\)\)|\(.*?\)\))|\(\(.*?\)/g,
    replace: (match) => replaceDoubleToken(match, '(', ')', 'i'),
  },
  {
    search: /(\[\[.*?\]\]|\[.*?\]\])|\[\[.*?\]/g,
    replace: (match) => replaceDoubleToken(match, '[', ']', 'i'),
  },
  {
    search: /(\{\{.*?\}\}|\{.*?\}\})|\{\{.*?\}/g,
    replace: EMPTY,
  },
  {
    search: /<<\w+>>/g,
    replace: (match) => replaceDoubleToken(match, '<', '>', 'b'),
  },
  {
    search: /\*(\w|\s)+\*/g,
    replace: (match) =>
      repeated(match, '*') ? match : replaceToken(match, '*', 'b'),
  },
  {
    search: /_(\w+)_/g,
    replace: (match) =>
      repeated(match, '_') ? match : replaceToken(match, '_', 'u'),
  },
  {
    search: /-{2,}/g,
    replace: (match) => (repeated(match, '-', 3) ? match : '—'),
  },
  { search: / - /g, replace: '—' },
  { search: /->/g, replace: '→' },
  { search: /<-/g, replace: '←' },
  { search: /"/g, replace: '“' },
  { search: /(\.{3}|(\. ){3})/g, replace: '…' },
  { search: /(^\n+|\n+$)/g, replace: EMPTY },
  { search: /\n+/g, replace: '<br /><br />' },
  { search: / +/g, replace: ' ' },
  { search: /^ +| +$/g, replace: EMPTY },
];

export const prepareTranscript = ({ transcript }) => {
  let result = transcript;

  replacements.map(({ search, replace }) => {
    result = result.replaceAll(search, replace);
  });

  return result;
};

export const prepareDate = ({ year, month, day }) => {
  const date = new Date(year, month, day);
  const [monthName, weekdayName] = date
    .toLocaleString('en-US', { month: 'long', weekday: 'long' })
    .split(' ');

  return `${weekdayName}, ${monthName} ${day}, ${year}`;
};

export default { prepareTranscript, prepareDate };
