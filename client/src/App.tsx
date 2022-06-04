import { useState } from 'react';
import ColorInput from './components/ColorInput';

function App() {
  const [buttonText, setButtonText] = useState('Next')
  const [color, setColor] = useState('#505050')
  const [bgColor, setBgColor] = useState('#505050')
  const [isNextPage, setFlag] = useState(false)
  const [isDisabled, setDisabled] = useState(false)

  const handleDownload = async () => {
    setDisabled(true)
    const res = await fetch(`/theme?bg=${bgColor.slice(1)}&button=${color.slice(1)}`)
    const blob = await res.blob()
    const a = document.createElement('a')
    a.href = window.URL.createObjectURL(blob)
    a.download = 'Custom.ask'
    a.click()
    a.parentElement?.removeChild(a)
    setButtonText('downloading ...')
    window.setTimeout(() => window.location.reload(), 2000)
  }

  const saveBgChoice = () => {
    document.body.style.backgroundColor = color
    setBgColor(color)
    setColor('#ffb532')
    setButtonText("Download")
    setFlag(true)
  }

  return (
    <div className='content'>
      <ColorInput color={color} isNextPage={isNextPage} setColor={setColor}/>
      <button onClick={isNextPage ? handleDownload: saveBgChoice} disabled={isDisabled} className='button-74'>{buttonText}</button>
    </div>
  )
}

export default App
