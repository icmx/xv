export const applyReplacements = (string, ...replacements) => {
  let result = string;

  replacements.forEach(({ search, replace }) => {
    result = result.replaceAll(search, replace);
  });

  return result;
};
