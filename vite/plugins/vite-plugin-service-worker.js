import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import * as path from 'node:path';

export const serviceWorker = ({
  src,
  fileName = 'service-worker.js',
}) => {
  let publicDir;

  return {
    name: 'xv:service-worker',
    apply: 'build',
    enforce: 'post',

    configResolved(config) {
      publicDir = config.publicDir;
    },

    async generateBundle(_options, bundle) {
      const entries = await readdir(publicDir, {
        recursive: true,
        withFileTypes: true,
      });

      const published = entries
        .filter((entry) => entry.isFile())
        .map((entry) =>
          path
            .relative(
              publicDir,
              path.join(entry.parentPath, entry.name)
            )
            .split(path.sep)
            .join('/')
        )
        .sort();

      const bundled = Object.keys(bundle).sort();

      const hash = createHash('sha256');

      for (const file of bundled) {
        const chunk = bundle[file];

        hash.update(file);
        hash.update(chunk.type === 'chunk' ? chunk.code : chunk.source);
      }

      for (const file of published) {
        hash.update(file);
        hash.update(await readFile(path.join(publicDir, file)));
      }

      const urls = [...bundled, ...published].map((file) => `/${file}`);

      const source = (await readFile(src, 'utf8'))
        .replace('__SW_VERSION__', hash.digest('hex').slice(0, 12))
        .replace('__SW_PRECACHE_URLS__', JSON.stringify(urls, null, 2));

      this.emitFile({ type: 'asset', fileName, source });
    },
  };
};
