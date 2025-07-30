import React from 'react'
import Card from './Card'
import './GameBoard.css'

const GameBoard = ({ cards, flippedCards, matchedCards, gamePhase, onCardClick }) => {
  return (
    <div className="game-board">
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          isFlipped={flippedCards.includes(index)}
          isMatched={matchedCards.includes(index)}
          gamePhase={gamePhase}
          onClick={() => onCardClick(index)}
        />
      ))}
    </div>
  )
}

export default GameBoard
