import applyReplacements from '../utils/applyReplacements';

import {
  asterisksToken,
  cleanupSet,
  escapesSet,
  tokensSet,
  typographicsSet,
  underscoresToken,
} from './replacements';

export const title = ({ title }) => {
  const result = applyReplacements(title, [
    ...escapesSet,
    ...cleanupSet,
    ...typographicsSet,
  ]);

  return result;
};

export const alt = ({ alt }) => {
  const result = applyReplacements(alt, [
    ...escapesSet,
    asterisksToken,
    underscoresToken,
    ...cleanupSet,
    ...typographicsSet,
  ]);

  return `“${result}“`;
};

export const date = ({ year, month, day }) => {
  const source = new Date(year, month, day);

  const [monthName, weekdayName] = source
    .toLocaleString('en-US', { month: 'long', weekday: 'long' })
    .split(' ');

  const result = `${weekdayName}, ${monthName} ${day}, ${year}`;

  return result;
};

export const transcript = ({ transcript }) => {
  const result = applyReplacements(transcript, [
    ...escapesSet,
    ...tokensSet,
    ...cleanupSet,
    ...typographicsSet,
  ]);

  return result;
};
