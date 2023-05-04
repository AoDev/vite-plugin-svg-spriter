import fs from 'fs'
import path from 'path'
import SVGSprite from 'svg-sprite'
import type {Config} from 'svg-sprite'
import type {Plugin, HtmlTagDescriptor} from 'vite'

const spriterConfig: Config = {
  // @ts-expect-error types definition have an issue https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/65401
  mode: {symbol: {inline: true}},
  shape: {transform: []}, // remove svgo
}

let symbolList: string[] = []

function createSVGSpritePlugin(folderPath: string): Plugin {
  return {
    name: 'svg-sprite',
    async transformIndexHtml() {
      const files = fs.readdirSync(folderPath)
      const spriter = new SVGSprite(spriterConfig)
      symbolList = []

      for (const file of files) {
        const filePath = path.resolve(folderPath, file)
        const svg = fs.readFileSync(filePath, 'utf-8')
        spriter.add(filePath, null, svg)
        const symbolName = file.replace('.svg', '')
        symbolList.push(symbolName)
      }

      const {result} = await spriter.compileAsync()
      const sprite = result.symbol.sprite.contents.toString()
      const spriteTag: HtmlTagDescriptor = {
        tag: 'div',
        attrs: {'aria-hidden': true},
        children: sprite,
        injectTo: 'body-prepend',
      }

      return [spriteTag]
    },
  }
}

export default createSVGSpritePlugin
