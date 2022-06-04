import { XMLBuilder, XMLParser } from "fast-xml-parser";
import { appendFileSync, readFile, readFileSync, writeFile, writeFileSync } from "fs";
import { join, parse } from "path";
import { fieldsArray, options, channels, fieldOffsets, buttonFields} from './constants'

export function editTheme(bgHex: string, buttonHex: string) {
  const xmlParser = new XMLParser(options)
  const jObj = xmlParser.parse(readFileSync(join(__dirname, '../res/Dark.ask'), 'utf-8'))
  setBackground(jObj['Ableton']['SkinManager'], bgHex, buttonHex)
  const builder = new XMLBuilder(options)
  const xml = builder.build(jObj)
  const writePath = join(__dirname, '../res/Custom.ask')
  writeFileSync(writePath, xml)
}

function setBackground(jsonObj:any, hexColor: string, butColor:string) {
  fieldsArray.forEach((fields, i) => {
    fields.forEach((field) => {
      channels.forEach((channel, j) =>
        jsonObj[field][channel]['Value'] = calcColor(hexColor, j*2, j*2+2, j > 2 ? 65 : fieldOffsets[i]))
    })
  })
  buttonFields.forEach((field) => {
    channels.forEach((channel, j) => jsonObj[field][channel]['Value'] = calcColor(butColor, j*2, j*2+2))
  })
}

const calcColor = (hexColor: string, l: number, r: number, offset: number = 65) => {
  const c = clamp(offset - 65 + parseInt(hexColor.slice(l, r) || 'ff', 16))
  console.log(c)
  console.log(hexColor)
  return c
}
const clamp = (color: number) => Math.min(Math.max(color, 0), 255)
