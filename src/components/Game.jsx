import React, { useState, useEffect } from 'react'
import GameBoard from './GameBoard'
import ScoreBoard from './ScoreBoard'
import { generateCards, shuffleArray } from '../utils/gameUtils'
import { playFlipSound, playMatchSound, playMismatchSound, playVictorySound, toggleSound, isAudioEnabled } from '../utils/soundUtils'

const Game = () => {
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [score, setScore] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [gamePhase, setGamePhase] = useState('preview')
  const [previewTimer, setPreviewTimer] = useState(60)
  const [gameStartTime, setGameStartTime] = useState(null)
  const [gameEndTime, setGameEndTime] = useState(null)
  const [playTime, setPlayTime] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

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

  // Toggle sound function
  const handleToggleSound = () => {
    const enabled = toggleSound()
    setSoundEnabled(enabled)
  }

  // Handle card click
  const handleCardClick = (cardIndex) => {
    if (gamePhase !== 'playing' || isProcessing) return
    if (flippedCards.includes(cardIndex) || matchedCards.includes(cardIndex)) return
    if (flippedCards.length >= 2) return

    // 카드 뒤집기 사운드 재생
    if (soundEnabled) {
      playFlipSound()
    }

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
          
          // 매치 성공 사운드 재생
          if (soundEnabled) {
            playMatchSound()
          }
          
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
            // 게임 완료 사운드 재생
            if (soundEnabled) {
              setTimeout(() => playVictorySound(), 300)
            }
          }
        } else {
          // No match
          setMistakes(prev => prev + 1)
          setFlippedCards([])
          setCurrentStreak(0)
          
          // 매치 실패 사운드 재생
          if (soundEnabled) {
            playMismatchSound()
          }
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

  const totalPairs = 26
  const remainingPairs = totalPairs - score

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
        soundEnabled={soundEnabled}
        onReset={resetGame}
        onSkipPreview={skipPreview}
        onGiveUp={giveUp}
        onToggleSound={handleToggleSound}
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
              <p>Completed: {score} / {totalPairs} pairs</p>
              <p>Remaining: {remainingPairs} pairs</p>
              <p>Mistakes: {mistakes}</p>
              <p>Maximum streak: {maxStreak} consecutive matches</p>
            </>
          ) : (
            <>
              <h2>Congratulations!</h2>
              <p>You completed the game in {formatTime(getFinalPlayTime())}!</p>
              <p>All {totalPairs} pairs matched!</p>
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