import _ from '~/utils';

import Core from '~/app/core';

export class ComicApi extends Core.Api {
  constructor(endpoint) {
    super(endpoint);
  }

  /**
   * Get specific xkcd comic by its number (`num` property).
   * If `num` is omitted, then latest comic will be returned.
   */
  async get(num) {
    const option = num ? `/${num}` : ``;

    try {
      const response = await fetch(
        `${this.endpoint}${option}/info.0.json`
      );

      return await response.json();
    } catch (e) {
      throw new Error(`Unable to fetch comic '${option}': ${e}`);
    }
  }

  /**
   * Get current (latest) xkcd comic.
   */
  async current() {
    try {
      return await this.get(undefined);
    } catch (e) {
      throw new Error(`Unable to fetch current comic: ${e}`);
    }
  }

  /**
   * Get random xkcd comic.
   * Note: due to official API design, this will perform two actual
   * requests.
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
