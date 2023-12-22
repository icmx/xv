import { random } from '#/lib/common';
import { Api } from '../../core/Api';

/**
 * Xkcd API client.
 */
export class XkcdApi extends Api {
  constructor(baseUrl) {
    super(baseUrl);
  }

  /**
   * Get specific xkcd comic JSON data by its id (`num` property). If
   * `num` is omitted, then current (latest) comic will be retrieved.
   * @param {number} num - xkcd comic id to get
   * @returns {XkcdComic}
   */
  async getByNum(num) {
    return await this.get(`/${num}/info.0.json`);
  }

  /**
   * Get current (i.e. latest) xkcd comic.
   * @returns {XkcdComic}
   */
  async getCurrent() {
    return await this.get(`/info.0.json`);
  }

  /**
   * Get random xkcd comic.
   * *Note:* due to official JSON API design, this method will perform
   * two actual HTTP requests.
   * @returns {XkcdComic}
   */
  async getRandom() {
    const current = await this.getCurrent();

    const min = 1;
    const max = current.num;
    const num = random(min, max);

    return await this.getByNum(num);
  }
}
