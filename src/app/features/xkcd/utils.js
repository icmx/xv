export const convertImageSrc = (src) => {
  const { pathname } = new URL(src);

  if (!pathname.startsWith('/comics/')) {
    return src;
  }

  return pathname.replace(/^\/comics\//, '/files/comics/xkcd/');
};
