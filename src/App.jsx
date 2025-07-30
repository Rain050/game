import React from 'react'
import Game from './components/Game'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Memory Card Game</h1>
        <p>Find matching pairs of cards with the same rank and color!</p>
      </header>
      <main>
        <Game />
      </main>
    </div>
  )
}

export default App
