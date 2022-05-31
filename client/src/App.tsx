import { useState } from 'react';
import ColorInput from './components/ColorInput';

function App() {
  const [buttonText, setButtonText] = useState('Next')
  const [color, setColor] = useState('#ffffff')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [isNextPage, setFlag] = useState(false)

  const handleDownload = async () => {
    const res = await fetch(`/theme?bg=${bgColor.slice(1)}?button=${color.slice(1)}`)
    const blob = await res.blob()
    const a = document.createElement('a')
    a.href = window.URL.createObjectURL(blob)
    a.download = 'Custom.ask'
    a.click()
    a.parentElement?.removeChild(a)
  }

  const saveBgChoice = () => {
    document.body.style.backgroundColor = color
    setBgColor(color)
    setColor('#ffffff')
    setButtonText("Download")
    setFlag(true)
  }

  return (
    <div className='content'>
      <ColorInput color={color} isNextPage={isNextPage} setColor={setColor}/>
      <button onClick={isNextPage ? handleDownload: saveBgChoice}>{buttonText}</button>
    </div>
  )
}

export default App
