# xv

[![Netlify Status](https://api.netlify.com/api/v1/badges/7bae3cd6-2824-48bb-bba5-1c55e521e7ee/deploy-status)](https://app.netlify.com/sites/icmx-xv/deploys)

[xkcd.com](https://xkcd.com/) viwer app, done in pure JavaScript and Webpack.

Check it **[here](https://icmx-xv.netlify.app/)**!

## Features

  - Pure JavaScript and CSS, no frameworks used
  - Classic navigation experience (Random button included)
  - Routing: try [#303](https://icmx-xv.netlify.app/#303) e.g.
  - Transcript for ~1600 first comics, with [parsing](src/utils/parser.js)!
  - Mobile-first and desktop layouts
  - Light and Dark modes without flashing on refresh

## Development

```sh
# clone repository
git clone https://github.com/icmx/xv

# go to local copy
cd xv

# install dependencies
npm install

# launch it on localhost:8000
npm run serve

# build it
npm run build
```

## License

[MIT](LICENSE).

Original comics are made by Randall Munroe at [xkcd.com](https://xkcd.com/).

Icons made by Atisa at [boxicons.com](https://boxicons.com/).
