import { re } from './re';

export const isRepeated = (string, character, count = 1) => {
  const pattern = re`^\\${character}{${count},}$`;
  return pattern.test(string);
};
