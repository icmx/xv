/**
 * Apply typography enhancements like correct dashes, arrows, ellipsis
 * and so on.
 *
 * @param {string} source
 * @returns {string}
 */
export const mapTypography = (source) => {
  return source
    .replaceAll(/-{2,}/gm, ' — ')
    .replaceAll(/ - /gm, ' — ')
    .replaceAll(/-&gt;/gm, '→')
    .replaceAll(/&lt;-/gm, '←')
    .replaceAll(/(\.{3}|(\. ){3})/gm, '…')
    .replaceAll(/ +… *?/gm, '… ')
    .replaceAll(/"\S(.*?)"/g, (match) =>
      match?.replace(/^"/, '“').replace(/"$/, '”')
    );
};
