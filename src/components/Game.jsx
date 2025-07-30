import React, { useState, useEffect } from 'react'
import GameBoard from './GameBoard'
import ScoreBoard from './ScoreBoard'
import { generateCards, shuffleArray } from '../utils/gameUtils'

const Game = () => {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [score, setScore] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [gamePhase, setGamePhase] = useState('preview') // preview, playing, completed
  const [previewTimer, setPreviewTimer] = useState(15)
  const [isProcessing, setIsProcessing] = useState(false)

  // Initialize game
  useEffect(() => {
    const newCards = shuffleArray(generateCards())
    setCards(newCards)
  }, [])

  // Preview timer countdown
  useEffect(() => {
    if (gamePhase === 'preview' && previewTimer > 0) {
      const timer = setTimeout(() => {
        setPreviewTimer(previewTimer - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (gamePhase === 'preview' && previewTimer === 0) {
      setGamePhase('playing')
    }
  }, [gamePhase, previewTimer])

  // Handle card click
  const handleCardClick = (cardIndex) => {
    if (gamePhase !== 'playing' || isProcessing) return
    if (flippedCards.includes(cardIndex) || matchedCards.includes(cardIndex)) return
    if (flippedCards.length >= 2) return

    const newFlippedCards = [...flippedCards, cardIndex]
    setFlippedCards(newFlippedCards)

    // Check for match when 2 cards are flipped
    if (newFlippedCards.length === 2) {
      setIsProcessing(true)
      const [firstIndex, secondIndex] = newFlippedCards
      const firstCard = cards[firstIndex]
      const secondCard = cards[secondIndex]

      // Check if cards match (same rank and same color)
      const isMatch = firstCard.rank === secondCard.rank && firstCard.color === secondCard.color

      setTimeout(() => {
        if (isMatch) {
          // Match found
          setMatchedCards(prev => [...prev, firstIndex, secondIndex])
          setScore(prev => prev + 1)
          setFlippedCards([])
          
          // Check if game is completed
          if (matchedCards.length + 2 === cards.length) {
            setGamePhase('completed')
          }
        } else {
          // No match
          setMistakes(prev => prev + 1)
          setFlippedCards([])
        }
        setIsProcessing(false)
      }, 1000)
    }
  }

  // Reset game
  const resetGame = () => {
    const newCards = shuffleArray(generateCards())
    setCards(newCards)
    setFlippedCards([])
    setMatchedCards([])
    setScore(0)
    setMistakes(0)
    setGamePhase('preview')
    setPreviewTimer(15)
    setIsProcessing(false)
  }

  return (
    <div className="game-container">
      <ScoreBoard 
        score={score} 
        mistakes={mistakes} 
        gamePhase={gamePhase}
        previewTimer={previewTimer}
        onReset={resetGame}
      />
      <GameBoard 
        cards={cards}
        flippedCards={flippedCards}
        matchedCards={matchedCards}
        gamePhase={gamePhase}
        onCardClick={handleCardClick}
      />
      {gamePhase === 'completed' && (
        <div className="game-completed">
          <h2>Congratulations!</h2>
          <p>You completed the game with {mistakes} mistakes!</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  )
}

export default Game
