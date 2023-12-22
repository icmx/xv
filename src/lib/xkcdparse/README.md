# xkcdparse

xv internal library to destruct an xkcd comic JSON data and transform into nice plain text or HTML strings.

## How it works

xkcdparse has "destructors" API which are actually functions that takes xkcd comic JSON data. The following example will explain it better.

Suppose there's [xkcd #927](https://xkcd.com/927/) JSON:

```js
import xkcdparse from '#/somewhere/xkcdparse';

// (multiline for readability)
const comic = {
  "num": 927,
  "title": "Standards",
  "alt": `Fortunately, the charging one has been solved now that we've
    all standardized on mini-USB. Or is it micro-USB? Shit.`,
  "transcript": `
    HOW STANDARDS PROLIFERATE(See: A\nC chargers, character encodings,
    instant messaging, etc.)\n\nSITUATION:↵There are 14 competing
    standards.\n\nGeek: 14?! Ridiculous! We need to develop one
    universal standard that covers everyone's use cases.\nFellow Geek:
    Yeah!\n\nSoon:\nSITUATION:\nThere are 15 competing standards.\n\n
    {{Title text: Fortunately, the charging one has been solved now
    that we've all standardized on mini-USB. Or is it micro-USB?
    Shit.}}`,
    // ...rest props
}

const a = xkcdparse.title(comic); // -> title destructor:
//
// Standards

const b = xkcdparse.alt(comic); // -> alt destructor:
//
// (multiline for readability)
// “Fortunately, the charging one has been solved now that we've all
// standardized on mini-USB. Or is it micro-USB? Shit.“

const c = xkcdparse.date(comic); // ->  date destructor:
//
// Saturday, August 20, 2011

const d = xkcdparse.transcript(comic); // -> transcript destructor:
//
// (multiline for readability)
// HOW STANDARDS PROLIFERATE
// <br /><br/>
// (See: A
// <br /><br />
// C chargers, character encodings, instant messaging, etc.)
// <br /><br />
// SITUATION:
// <br /><br />
// There are 14 competing standards.
// <br /><br />
// Geek: 14?! Ridiculous! We need to develop one universal standard
// that covers everyone's use cases.
// <br /><br />
// Fellow Geek: Yeah!
// <br /><br />
// Soon:
// <br /><br />
// SITUATION:
// <br /><br />There are 15 competing standards.
```

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
