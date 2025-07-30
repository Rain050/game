import React from 'react'

const ScoreBoard = ({ 
  score, 
  mistakes, 
  currentStreak, 
  maxStreak, 
  gamePhase, 
  previewTimer, 
  playTime, 
  formatTime, 
  onReset, 
  onSkipPreview, 
  onGiveUp 
}) => {
  return (
    <div className="score-board">
      <div className="score-info">
        <div className="score-item">
          <span className="score-label">Score:</span>
          <span className="score-value">{score}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Mistakes:</span>
          <span className="score-value">{mistakes}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Current Streak:</span>
          <span className="score-value streak-current">{currentStreak}</span>
        </div>
        <div className="score-item">
          <span className="score-label">Max Streak:</span>
          <span className="score-value streak-max">{maxStreak}</span>
        </div>
        {gamePhase === 'preview' && (
          <div className="score-item">
            <span className="score-label">Preview:</span>
            <span className="score-value">{previewTimer}s</span>
          </div>
        )}
        {gamePhase === 'playing' && (
          <div className="score-item">
            <span className="score-label">Time:</span>
            <span className="score-value play-time">{formatTime(playTime)}</span>
          </div>
        )}
      </div>
      <div className="game-controls">
        {gamePhase === 'preview' && (
          <button onClick={onSkipPreview} className="skip-button">
            Skip Preview
          </button>
        )}
        {gamePhase === 'playing' && (
          <button onClick={onGiveUp} className="give-up-button">
            Give Up
          </button>
        )}
        <button onClick={onReset} className="reset-button">
          New Game
        </button>
      </div>
    </div>
  )
}

export default ScoreBoard
