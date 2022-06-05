import { useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import ColorInput from './components/ColorInput';

function Home() {
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

  const navigate = useNavigate()

  return (
    <>
      <div className='content'>
        <ColorInput color={color} isNextPage={isNextPage} setColor={setColor}/>
        <button onClick={isNextPage ? handleDownload: saveBgChoice} disabled={isDisabled} className='button-74'>{buttonText}</button>
      </div>
      <button className='button-84' onClick={() => {
        navigate('help')
      }}>Need help?</button>
    </>
  )
}

function Help() {
  return(
    <div className='content'>
      <h1>Here is how to use</h1>
      <ul>
        <li>Move the downloaded file to C:\AppData\Ableton\Resources\Themes</li>
        <li>Rename the file by adding proper sereal number and a name of your choice. eg: 05oneDark.ask</li>
        <li>Open Ableton live and change the theme 🔥</li>
      </ul>
    </div>
  )
}

export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/help" element={<Help/>}/>
      </Routes>
    </BrowserRouter>
  )
}
