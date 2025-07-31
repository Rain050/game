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
  soundEnabled,
  onReset, 
  onSkipPreview, 
  onGiveUp,
  onToggleSound
}) => {
  const totalPairs = 26
  const remainingPairs = totalPairs - score

  return (
    <div className="score-board">
      <div className="score-info">
        <div className="score-item">
          <span className="score-label">Remaining:</span>
          <span className="score-value">{remainingPairs}/{totalPairs}</span>
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
        <button onClick={onSkipPreview} className="control-button">
          Skip Preview
        </button>
      )}
      {gamePhase === 'playing' && (
        <button onClick={onGiveUp} className="control-button">
          Give Up
        </button>
      )}
      <button onClick={onReset} className="control-button">
        New Game
      </button>
      <button 
        onClick={onToggleSound} 
        className={`sound-button ${soundEnabled ? 'sound-on' : 'sound-off'}`}
        title={soundEnabled ? 'Sound On' : 'Sound Off'}
      >
        {soundEnabled ? '🔊' : '🔇'}
      </button>
    </div>

    </div>
  )
}

export default ScoreBoard
