import { useState, useEffect, useRef } from 'react'
import MemeGenerator from './components/MemeGenerator'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MemeGenerator />
    </>
  )
}

export default App
