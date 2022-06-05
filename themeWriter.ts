import { XMLBuilder, XMLParser } from "fast-xml-parser";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { fieldsArray, options, channels, fieldOffsets, buttonFields } from './constants'

export function editTheme(bgHex: string, buttonHex: string) {
  const xmlParser = new XMLParser(options)
  const jObj = xmlParser.parse(readFileSync(join(__dirname, '../res/Dark.ask'), 'utf-8'))
  setBackground(jObj['Ableton']['SkinManager'], bgHex, buttonHex)
  const builder = new XMLBuilder(options)
  writeFileSync(join(__dirname, '../res/Custom.ask'), builder.build(jObj))
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

const calcColor = (hexColor: string, l: number, r: number, offset: number = 65) =>
  clamp(offset - 65 + parseInt(hexColor.slice(l, r) || 'ff', 16))

const clamp = (color: number) => Math.min(Math.max(color, 0), 255)
