export const putHex = (value: string) => (value[0] === '#') ? value : `#${value}`

export const isValidHexColor = (hexValue: string) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(hexValue)


