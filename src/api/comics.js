/**
 * Get specific xkcd comic by its number (`num` property).
 * If `num` is omitted, then latest comic will be returned.
 */
export const get = async (num = undefined) => {
  throw new Error();
};

/**
 * Get latest xkcd comic.
 */
export const latest = async () => {
  throw new Error();
};

/**
 * Get random xkcd comic.
 * Note: due to official API design, this will perform two actual
 * requests.
 */
export const random = async () => {
  throw new Error();
};
