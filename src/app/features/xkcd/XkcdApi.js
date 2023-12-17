import { Api } from '#/app/core';
import { random } from '#/app/utils';

/**
 * Xkcd API client.
 */
export class XkcdApi extends Api {
  constructor(endpoint) {
    super(endpoint);
  }

  /**
   * Get specific xkcd comic JSON data by its id (`num` property). If
   * `num` is omitted, then current (latest) comic will be retrieved.
   * @param {number} num - xkcd comic id to get
   * @returns {XkcdComic}
   */
  async get(num) {
    this.refresh();

    const path =
      num === undefined ? `/info.0.json` : `/${num}/info.0.json`;

    try {
      const response = await fetch(`${this.endpoint}${path}`, {
        method: 'GET',
        signal: this.signal,
      });

      const result = await response.json();

      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Get current (i.e. latest) xkcd comic.
   * @returns {XkcdComic}
   */
  async current() {
    try {
      return await this.get();
    } catch (e) {
      throw e;
    }
  }

  /**
   * Get random xkcd comic.
   * *Note:* due to official JSON API design, this method will perform
   * two actual HTTP requests.
   * @returns {XkcdComic}
   */
  async random() {
    try {
      const current = await this.current();

      const min = 1;
      const max = current.num;
      const num = random(min, max);

      return await this.get(num);
    } catch (e) {
      throw e;
    }
  }
}
