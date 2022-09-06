import { Accessor, Component, Setter } from "solid-js"
import { isValidHexColor, putHex } from "../utils/hexValidator"

interface InputProps {
  ref: HTMLInputElement | undefined
  color: Accessor<string>
  setColor: Setter<string>
}

export const Input: Component<InputProps> = ({ref, color, setColor}) => {
  const updateColor = (color: string) => isValidHexColor(color) && setColor(color)
  return (
    <div class='inputBox'>
    <input class='inp' ref={ref} type='text' onInput={(e) => updateColor(putHex(e.currentTarget.value))} />
      <div class='colorBox' style={{ "background-color": color() }}></div>
    </div>
  )
}

