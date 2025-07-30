import React from 'react'

const ScoreBoard = ({ score, mistakes, gamePhase, previewTimer, onReset }) => {
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
        {gamePhase === 'preview' && (
          <div className="score-item">
            <span className="score-label">Preview:</span>
            <span className="score-value">{previewTimer}s</span>
          </div>
        )}
      </div>
      <div className="game-controls">
        <button onClick={onReset} className="reset-button">
          New Game
        </button>
      </div>
    </div>
  )
}

export default ScoreBoard
