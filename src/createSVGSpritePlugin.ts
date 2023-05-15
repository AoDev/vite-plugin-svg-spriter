import fs from 'fs'
import path from 'path'
import SVGSprite from 'svg-sprite'
import type {Config} from 'svg-sprite'
import type {Plugin, HtmlTagDescriptor} from 'vite'

interface IConfig {
  svgFolder: string
  svgSpriteConfig?: Config
  transformIndexHtmlTag?: Partial<Omit<HtmlTagDescriptor, 'children'>>
}

const defaultSpriterConfig: Config = {
  // @ts-expect-error types definition have an issue https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/65401
  mode: {symbol: {inline: true}},
  shape: {transform: []}, // remove default svgo
}

const defaultTag: HtmlTagDescriptor = {
  tag: 'div',
  attrs: {'aria-hidden': true},
  injectTo: 'body-prepend',
}

let symbolList: string[] = []

function createSVGSpritePlugin({
  svgFolder,
  svgSpriteConfig = {},
  transformIndexHtmlTag = {},
}: IConfig): Plugin {
  return {
    name: 'svg-sprite',
    async transformIndexHtml() {
      const files = fs.readdirSync(svgFolder)
      const spriter = new SVGSprite({...defaultSpriterConfig, ...svgSpriteConfig})
      symbolList = []

      for (const file of files) {
        const filePath = path.resolve(svgFolder, file)
        const svg = fs.readFileSync(filePath, 'utf-8')
        spriter.add(filePath, null, svg)
        const symbolName = file.replace('.svg', '')
        symbolList.push(symbolName)
      }

      const {result} = await spriter.compileAsync()
      const sprite = result.symbol.sprite.contents.toString()
      const spriteTag: HtmlTagDescriptor = {
        ...defaultTag,
        ...transformIndexHtmlTag,
        children: sprite,
      }

      return [spriteTag]
    },
  }
}

export default createSVGSpritePlugin
