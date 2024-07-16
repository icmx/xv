/**
 * Removes content inside curly brackets along with brackets itself
 * since that content duplicates title property value.
 *
 * @param {string} source
 * @returns {string}
 */
export const mapCurlyBrackets = (source) => {
  return source.replace(
    /\n*(\{\{[\s\S]*?\}\}|\{[\s\S]*?\}\}|\{\{[\s\S]*?\})\n*/g,
    ''
  );
};
