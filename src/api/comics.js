import _ from '~/utils/common';
import Comic from '~/models/comic';

const ENDPOINT = `/api/comics`;

/**
 * Get specific xkcd comic by its number (`num` property).
 * If `num` is omitted, then latest comic will be returned.
 */
export const get = async (num = undefined) => {
  const option = num === undefined ? `` : `/${num}`;

  try {
    const response = await fetch(`${ENDPOINT}${option}/info.0.json`);
    const data = await response.json();

    const comic = Comic.fromRaw(data);

    return comic;
  } catch (e) {
    throw new Error(`Unable to fetch comic '${option}': ${e}`);
  }
};

/**
 * Get current (latest) xkcd comic.
 */
export const current = async () => {
  try {
    return await get(undefined);
  } catch (e) {
    throw new Error(`Unable to fetch latest comic: ${e}`);
  }
};

/**
 * Get random xkcd comic.
 * Note: due to official API design, this will perform two actual
 * requests.
 */
export const random = async () => {
  try {
    const latest = await current();

    const min = 1;
    const max = latest.num;
    const random = _.random(min, max);

    return await get(random);
  } catch (e) {
    throw new Error(`Unable to fetch random comic: ${e}`);
  }
};

export default { get, current, random };
