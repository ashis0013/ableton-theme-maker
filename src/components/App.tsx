import { Component, createSignal } from 'solid-js';
import { Input } from './Input';
import { createTheme } from '../utils/themeMaker';

const App: Component = () => {
  const [color, setColor] = createSignal('')
  const [isNextPage, setNextPage] = createSignal(false)
  const buttonText = () => isNextPage() ? 'Download' : 'Next'
  const buttonOnClick = () => isNextPage() ? download() : goNextPage()

  let inputRef: HTMLInputElement | undefined
  let buttonRef: HTMLButtonElement | undefined
  let bgColor: string | undefined

  const goNextPage = () => {
    setNextPage(true)
    if (inputRef) {
      inputRef.value = ''
      inputRef.placeholder = 'Enter hex for button'
    }
    document.body.style.backgroundColor = color()
    bgColor = color()
  }

  const download = () => {
    const blob = new Blob([createTheme(bgColor, color())], {type: 'text/plain'});
    const a = document.createElement('a')
    a.href = window.URL.createObjectURL(blob)
    a.download = 'Custom.ask'
    a.click()
    a.parentElement?.removeChild(a)
    if (buttonRef) {
      buttonRef.innerText = 'downloading...'
      buttonRef.disabled = true
    }
    window.setTimeout(() => window.location.reload(), 2000)
  }

  return (
    <div class='content'>
      <Input ref={inputRef} color={color} setColor={setColor}/>
      <button class='button-74' ref={buttonRef} onClick={() => buttonOnClick()}>
        {buttonText()}
      </button>
    </div>
  );
};

export default App;
