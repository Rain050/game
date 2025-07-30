// Generate 52 cards: 13 ranks × 2 colors × 2 sets each
export const generateCards = () => {
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
  const colors = ['red', 'black']
  const cards = []

  // Create 2 sets of each color (total 4 sets)
  colors.forEach(color => {
    // Create 2 sets of each color
    for (let set = 0; set < 2; set++) {
      ranks.forEach(rank => {
        cards.push({
          rank,
          color,
          id: `${color}-${rank}-${set}`
        })
      })
    }
  })

  return cards
}

// Fisher-Yates shuffle algorithm
export const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Check if two cards match (same rank and same color)
export const cardsMatch = (card1, card2) => {
  return card1.rank === card2.rank && card1.color === card2.color
}
