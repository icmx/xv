# xv [![Netlify Status](https://api.netlify.com/api/v1/badges/7bae3cd6-2824-48bb-bba5-1c55e521e7ee/deploy-status)](https://icmx-xv.netlify.app/)

Check it on **[icmx-xv.netlify.app](https://icmx-xv.netlify.app/)**!

xv is xkcd comics viwer app, done in pure JavaScript, CSS and Webpack.

## Features

  - Pure JavaScript and CSS, no frameworks or external dependencies used
  - Classic navigation experience (Random comic included)
  - Keyboard navigation: <kbd>←</kbd> / <kbd>→</kbd> for previous/next (<kbd>Shift</kbd> for first/last), <kbd>R</kbd> for random
  - Routing: try [/#303](https://icmx-xv.netlify.app/#303) e.g.
  - Transcript for ~1600 first comics, with [parsing](src/lib/comicparse)!
  - Mobile-first and desktop layouts
  - Light and Dark modes without flashing on refresh — works with images too!

## How it looks like?

![Animated demo of xv](demo.gif)

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
