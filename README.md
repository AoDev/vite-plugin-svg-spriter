# vite-plugin-svg-spriter

_Currently work in progress._

Build a svg sprite from individual svgs and inject it in your root html with vite.

### Install

`npm install vite-plugin-svg-spriter -DE`

Careful, it's spriter, with an 'r'.

### Plugin usage

In this initial version, the config is limited.
You only need to pass the path to your svgs.

Options will be added later.

```ts
// vite.config.ts

import {defineConfig} from 'vite'
import createSvgSpritePlugin from 'vite-plugin-svg-spriter'
import path from 'path'

const SRC_PATH = path.resolve(__dirname, 'src')
const SPRITE_PATH = path.resolve(SRC_PATH, 'assets', 'svg-sprite')

export default defineConfig({
  plugins: [react(), createSvgSpritePlugin(SPRITE_PATH)],
})
```

### Display svg

You can display a particular svg symbol with `svg use xlinkHref` where name is the svg filename without extension.

thumbs-up.svg

```html
<svg>
  <use xlinkHref="#thumbs-up" />
</svg>
```
