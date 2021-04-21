import {
  asterisksToken,
  cleanupSet,
  escapesSet,
  tokensSet,
  typographicsSet,
  underscoresToken,
} from './replacements';
import { applyReplacements } from './utils/applyReplacements';

export const title = ({ title }) => {
  return applyReplacements(
    title,
    ...escapesSet,
    ...cleanupSet,
    ...typographicsSet
  );
};

export const alt = ({ alt }) => {
  return applyReplacements(
    alt,
    ...escapesSet,
    asterisksToken,
    underscoresToken,
    ...cleanupSet,
    ...typographicsSet
  );
};

export const date = ({ year, month, day }) => {
  const source = new Date(year, month, day);

  const [monthName, weekdayName] = source
    .toLocaleString('en-US', { month: 'long', weekday: 'long' })
    .split(' ');

  return `${weekdayName}, ${monthName} ${day}, ${year}`;
};

export const transcript = ({ transcript }) => {
  return applyReplacements(
    transcript,
    ...escapesSet,
    ...tokensSet,
    ...cleanupSet,
    ...typographicsSet
  );
};
