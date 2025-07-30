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
  const [currentStreak, setCurrentStreak] = useState(0) // 현재 연속 정답
  const [maxStreak, setMaxStreak] = useState(0) // 최대 연속 정답
  const [gamePhase, setGamePhase] = useState('preview') // preview, playing, completed
  const [previewTimer, setPreviewTimer] = useState(60)
  const [gameStartTime, setGameStartTime] = useState(null) // 게임 시작 시간
  const [gameEndTime, setGameEndTime] = useState(null) // 게임 종료 시간
  const [playTime, setPlayTime] = useState(0) // 현재 플레이 시간 (초)
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
      startGame()
    }
  }, [gamePhase, previewTimer])

  // Play time counter
  useEffect(() => {
    let interval = null
    if (gamePhase === 'playing' && gameStartTime) {
      interval = setInterval(() => {
        setPlayTime(Math.floor((Date.now() - gameStartTime) / 1000))
      }, 1000)
    } else if (gamePhase === 'completed') {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [gamePhase, gameStartTime])

  // Start game function
  const startGame = () => {
    setGamePhase('playing')
    setGameStartTime(Date.now())
  }

  // Skip preview function
  const skipPreview = () => {
    if (gamePhase === 'preview') {
      startGame()
    }
  }

  // Give up function
  const giveUp = () => {
    if (gamePhase === 'playing') {
      setGamePhase('completed')
      setGameEndTime(Date.now())
    }
  }

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
          const newMatchedCards = [...matchedCards, firstIndex, secondIndex]
          setMatchedCards(newMatchedCards)
          setScore(prev => prev + 1)
          setFlippedCards([])
          
          // Update streak
          const newStreak = currentStreak + 1
          setCurrentStreak(newStreak)
          if (newStreak > maxStreak) {
            setMaxStreak(newStreak)
          }
          
          // Check if game is completed
          if (newMatchedCards.length === cards.length) {
            setGamePhase('completed')
            setGameEndTime(Date.now())
          }
        } else {
          // No match
          setMistakes(prev => prev + 1)
          setFlippedCards([])
          setCurrentStreak(0)
        }
        setIsProcessing(false)
      }, 1000)
    }
  }

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Get final play time
  const getFinalPlayTime = () => {
    if (gameEndTime && gameStartTime) {
      return Math.floor((gameEndTime - gameStartTime) / 1000)
    }
    return playTime
  }

  // Check if game was given up
  const wasGivenUp = () => {
    return gamePhase === 'completed' && matchedCards.length < cards.length
  }

  // Reset game
  const resetGame = () => {
    const newCards = shuffleArray(generateCards())
    setCards(newCards)
    setFlippedCards([])
    setMatchedCards([])
    setScore(0)
    setMistakes(0)
    setCurrentStreak(0)
    setMaxStreak(0)
    setGamePhase('preview')
    setPreviewTimer(60)
    setGameStartTime(null)
    setGameEndTime(null)
    setPlayTime(0)
    setIsProcessing(false)
  }

  return (
    <div className="game-container">
      <ScoreBoard 
        score={score} 
        mistakes={mistakes} 
        currentStreak={currentStreak}
        maxStreak={maxStreak}
        gamePhase={gamePhase}
        previewTimer={previewTimer}
        playTime={playTime}
        formatTime={formatTime}
        onReset={resetGame}
        onSkipPreview={skipPreview}
        onGiveUp={giveUp}
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
          {wasGivenUp() ? (
            <>
              <h2>Game Over</h2>
              <p>You gave up after {formatTime(getFinalPlayTime())}</p>
              <p>Score: {score} / 26</p>
              <p>Mistakes: {mistakes}</p>
              <p>Maximum streak: {maxStreak} consecutive matches</p>
            </>
          ) : (
            <>
              <h2>Congratulations!</h2>
              <p>You completed the game in {formatTime(getFinalPlayTime())}!</p>
              <p>Mistakes: {mistakes}</p>
              <p>Maximum streak: {maxStreak} consecutive matches!</p>
            </>
          )}
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  )
}

export default Game
