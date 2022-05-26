const putHex = (value: string) => (value[0] === '#') ? value : `#${value}`

const isValid = (hexValue: string) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(hexValue)

const updateColor = (color: string, setColor: (color: string) => void) => isValid(putHex(color)) && setColor(putHex(color))

interface Props {
  color: string
  setColor: React.Dispatch<React.SetStateAction<string>>
}

export default function ColorInput({ color, setColor }: Props) {
  return (
    <div className='inputBox'>
      <input type="text" placeholder='Enter hex color' className='inp' onChange={(e) => updateColor(e.target.value, setColor)}/>
      <div className='colorBox' style={{backgroundColor: color }}></div>
    </div>
  )
}
