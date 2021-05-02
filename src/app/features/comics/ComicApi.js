import Core from '~/app/core';
import random from '~/app/utils/random';

class ComicApi extends Core.Api {
  constructor(endpoint) {
    super(endpoint);
  }

  /**
   * Get specific xkcd comic by its id (`num` property). If `num` is
   * omitted, then latest comic will be returned.
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
   * Get current (latest) xkcd comic.
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
   * Note: due to official JSON API design, this will perform two
   * actual API requests.
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

export default ComicApi;
