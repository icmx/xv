# comicparse

Internal library to destruct an xkcd comic JSON data and prettify it to nice plain text or HTML strings.

## How it works

comicparse has "destructors" API which are actually a functions that takes xkcd comic JSON. The following snippet will explain it better:

```js
import parse from '.../comicparse';

// for example, given an xkcd #27 json:
const comic = {
  title: "Meat Cereals"
  transcript: "[[A collection of fictional meat based cereals]]\nPork Loops\nMice Krispies\nHammios\nFrosted Bacon Flakes\nScrapple Jacks\nHoney Bunches of Goats\n{{Alt: Disgusting}"
  // ...rest props
};

// now, use the destructors:

parse.title(comic);      // -> 'Meat Cereals'
parse.transcript(comic); // -> (multiline for readability)
// <i>A collection of fictional meat based cereals</i><br />
// <br />
// Pork Loops<br />
// <br />
// Mice Krispies<br />
// <br />
// Hammios<br />
// <br />
// Frosted Bacon Flakes<br />
// <br />
// Scrapple Jacks<br />
// <br />
// Honey Bunches of Goats
// (text in {{ alt: }} s omitted)
```

## Available destructors

  - **`title`**: applies cleanup and typographic rules on `title` property
  - **`alt`**: same as `title`, but for `alt` property
  - **`date`**: creates nice date string by using `year`, `month` and `day` properties
  - **`transcript`**:

## Syntax rules

I've realised that there are simple syntax rules used in comic `title`, `alt` and `transcript` properties.

There are some tokens:

  - `{{ hidden text }}`, used in `transcript`, actually a copy of `alt` property
  - `[[ coursive text ]]`, used for current comic frame description
  - `(( coursive text also ))`, same, but for more extra-context description
  - `<<bold text>>`
  - `*bold also*`
  - `_underline text_`

Typography rules:

  - `\n` breaks paragraphs
  - `--` means em dash
  - `-` is em dash also, but only when surrounded by spaces
  - `...` is ellipsis
  - `"` is quote mark

There are some extra rules also:

  - **Tokes cannot be nested**. That is, there could not be something like `[[ hello *bold* world ]]`. Note: this makes parsing WAY easier and I don't need to actually *parse* it into AST
  - There are should not be double paragraph breaks, as well as leading or trailing paragraph breaks. Same for spaces
  - Literal `<` and `>` should be replaced by escape entities `&lt;` and `&gt;`.
