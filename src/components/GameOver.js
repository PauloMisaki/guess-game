import React, { useContext } from 'react';
import { AppContext } from '../App';

function GameOver() {
  const { currentAttempt, gameOver, correctWord } = useContext(AppContext)
  return(
    <div className='gameOver'>
      <h3>{gameOver.guessedWord ? 'Você adivinhou a palavra' : 'Você não conseguiu adivinhar a palavra...'}</h3>
      <h3>Palavra correta: {correctWord}</h3>
      {gameOver.guessedWord && (<h3>Você adivinhou a palavra em {currentAttempt.attempt} tentativas.</h3>)}
    </div>
  )
}

export default GameOver