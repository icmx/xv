export const convertImageSrc = (src) => {
  const { pathname } = new URL(src);

  return pathname.replace(/^\/comics\//, '/files/comics/xkcd/');
};
