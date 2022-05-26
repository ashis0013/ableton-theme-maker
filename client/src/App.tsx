import { useState } from 'react';
import ColorInput from './components/ColorInput';

function App() {
  const [color, setColor] = useState("#ffffff")
  const handleDownload = async () => {
    const res = await fetch(`/theme?bg=${color.slice(1)}`)
    const blob = await res.blob()
    const a = document.createElement('a')
    a.href = window.URL.createObjectURL(blob)
    a.download = 'Custom.ask'
    a.click()
    a.parentElement?.removeChild(a)
  }

  return (
    <div className='content'>
      <ColorInput color={color} setColor={setColor}/>
      <button onClick={handleDownload}>download</button>
    </div>
  )
}

export default App
