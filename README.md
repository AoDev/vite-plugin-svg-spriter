# vite-plugin-svg-spriter

Build a svg sprite from individual svgs and inject it in your root html with vite.

Uses [svg-sprite](https://github.com/svg-sprite/svg-sprite) under the hood.

### Install

`npm install vite-plugin-svg-spriter -DE`

Careful, it's `"spriter"`, with an `'r'`.

### Plugin usage

The plugin only requires the path to your svgs. Check the configuration section for options.

```ts
// vite.config.ts

import {defineConfig} from 'vite'
import createSvgSpritePlugin from 'vite-plugin-svg-spriter'
import path from 'path'

const SRC_PATH = path.resolve(__dirname, 'src')
const SVG_FOLDER_PATH = path.resolve(SRC_PATH, 'assets', 'svg-sprite')

export default defineConfig({
  plugins: [createSvgSpritePlugin({svgFolder: SVG_FOLDER_PATH})],
})
```

By default, the sprite is prepended to your root html body element and no transformation is applied to the svgs.

### Display svg

You can display a particular svg symbol with `svg use xlinkHref` where name is the svg filename without extension.

thumbs-up.svg

```html
<svg>
  <use xlinkHref="#thumbs-up" />
</svg>
```

### Configuration (optional)

- **svg-sprite**: You can customize the output by providing a [svg-sprite config](https://github.com/svg-sprite/svg-sprite#configuration-basics).

- **injection**: You can provide a HtmlTagDescriptor for Vite [transformIndexHtml hook tag](https://vitejs.dev/guide/api-plugin.html#transformindexhtml)

```ts
defineConfig({
  plugins: [
    createSvgSpritePlugin({
      svgFolder: SVG_FOLDER_PATH,
      svgSpriteConfig: {
        shape: {
          transform: ['svgo'],
        },
      },
      transformIndexHtmlTag: {
        injectTo: 'body',
      },
    }),
  ],
})
```
