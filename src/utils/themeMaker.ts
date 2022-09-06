import { XMLBuilder, XMLParser } from "fast-xml-parser";
import { ask, fieldsArray, options, channels, fieldOffsets, buttonFields } from './constants'
import { isValidHexColor, putHex } from "./hexValidator";

export function createTheme(bgHex: string = '414141', buttonHex: string) {
  bgHex = isValidHexColor(putHex(bgHex)) ? putHex(bgHex).slice(1) : '414141'
  buttonHex = isValidHexColor(putHex(buttonHex)) ? putHex(buttonHex).slice(1): 'ffb532'
  const xmlParser = new XMLParser(options)
  const jObj = xmlParser.parse(ask)
  setBackground(jObj['Ableton']['SkinManager'], bgHex, buttonHex)
  const builder = new XMLBuilder(options)
  return builder.build(jObj)
}

function setBackground(jsonObj: any, hexColor: string, butColor:string) {
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
