import { toInt } from '#/lib/common';
import { parseAltProperty } from '../operators/parseAltProperty';
import { parseTitleProperty } from '../operators/parseTitleProperty';
import { parseTranscriptProperty } from '../operators/parseTranscriptProperty';
import { getDateString } from '../utils/getDateString';

export const title = ({ num, title }) => {
  const result = parseTitleProperty(title);

  return `#${num} — ${result}`;
};

export const alt = ({ alt }) => {
  const result = parseAltProperty(alt);

  return `“${result}”`;
};

export const date = ({ year, month, day }) => {
  const source = new Date(toInt(year), toInt(month - 1), toInt(day));

  return getDateString(source);
};

export const transcript = ({ transcript }) => {
  const result = parseTranscriptProperty(transcript);

  return result;
};
