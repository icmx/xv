import _ from '~/utils';

import Core from '~/app/core';

export class ComicApi extends Core.Api {
  constructor(endpoint) {
    super(endpoint);
  }

  /**
   * Get specific xkcd comic by its id (`num` property). If `num` is
   * omitted, then latest comic will be returned.
   */
  async get(num) {
    const path =
      num === undefined ? `/info.0.json` : `/${num}/info.0.json`;

    try {
      const response = await fetch(`${this.endpoint}${path}`);

      return await response.json();
    } catch (e) {
      throw new Error(`Unable to fetch comic '${path}': ${e}`);
    }
  }

  /**
   * Get current (latest) xkcd comic.
   */
  async current() {
    try {
      return await this.get();
    } catch (e) {
      throw new Error(`Unable to fetch current comic: ${e}`);
    }
  }

  /**
   * Get random xkcd comic.
   * Note: due to official JSON API design, this will perform two
   * actual API requests.
   */
  async random() {
    try {
      const latest = await this.current();

      const min = 1;
      const max = latest.num;
      const random = _.random(min, max);

      return await this.get(random);
    } catch (e) {
      throw new Error(`Unable to fetch random comic: ${e}`);
    }
  }
}
