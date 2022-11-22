import { useState } from 'react'
import './App.css'
import dividerDesktop from './assets/images/pattern-divider-desktop.svg'
import dividerMobile from './assets/images/pattern-divider-mobile.svg'
import dice from './assets/images/icon-dice.svg'

function App() {
  const [advice, setAdvice] = useState('')
  const [adviceNumber, setAdviceNumber] = useState('')
  const url = 'https://api.adviceslip.com/advice'

  async function connectToApi(url) {
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    return data
  }

  function loadAdvice(data) {
    setAdvice(data.slip.advice)
    setAdviceNumber(data.slip.id)
  }

  function refreshAdvice() {
    connectToApi(url).then(data => loadAdvice(data))
  }

  return (
    <>
      <main>
        <h1 className="sr-only">Advice Generator</h1>

        <div className="advice-box">
          <h2>ADVICE #{adviceNumber ? adviceNumber : 0}</h2>
          <blockquote>
            "{advice ? advice : 'Click on the dice for a new advice.'}"
          </blockquote>
          <picture>
            <source
              media="(min-width: 600px)"
              srcSet={dividerDesktop}
              alt="divider"
            />
            <source srcSet={dividerMobile} alt="divider" />
            <img src={dividerDesktop} alt="divider" />
          </picture>
          <button onClick={refreshAdvice}>
            <img className="dice" src={dice} alt="New advice" />
          </button>
        </div>
      </main>
      <footer>
        <div class="attribution">
          Challenge by{' '}
          <a
            href="https://www.frontendmentor.io/challenges/advice-generator-app-QdUG-13db"
            target="_blank"
          >
            Frontend Mentor
          </a>
          . Coded by{' '}
          <a href="https://github.com/pedrohsouza" target="_blank">
            Pedro Souza
          </a>
          .
        </div>
      </footer>
    </>
  )
}

export default App
