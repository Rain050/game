import React from 'react'
import './Card.css'

const Card = ({ card, isFlipped, isMatched, onClick, gamePhase }) => {
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  const shouldShowFront = gamePhase === 'preview' || isFlipped || isMatched

  return (
    <div 
      className={`card ${shouldShowFront ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`}
      onClick={handleClick}
    >
      <div className="card-inner">
        <div className="card-back">
          <div className="card-back-pattern"></div>
        </div>
        <div className="card-front">
          <div className={`card-content ${card.color}`}>
            <div className="card-rank">{card.rank}</div>
            <div className="card-suit">{card.color === 'red' ? '♥' : '♠'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
