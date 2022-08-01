import './App.css';
import Header from './components/Header';
import Game from './components/Game';
import { boardDefault, generateWordSet } from './components/Words';
import { createContext, useEffect, useState } from 'react';
import Keyboard from './components/Keyboard';
import GameOver from './components/GameOver';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({ attempt: 0, letterPos: 0, });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWord, setCorrectWord] = useState('matar');
  const [gameOver, setGameOver] = useState({ gameOver: false, guessedWord: false, })

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      //setCorrectWord(words.chosenWord);
    })
  }, [])

  const onSelectLetter = (keyVal) => {
    if (currentAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyVal;
    setBoard(newBoard)
    setCurrentAttempt({...currentAttempt, letterPos: currentAttempt.letterPos + 1});
  }
  const onDelete = () => {
    if (currentAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = '';
    setBoard(newBoard);
    setCurrentAttempt({...currentAttempt, letterPos: currentAttempt.letterPos - 1});
  }
  const onEnter = () => {
    if (currentAttempt.letterPos !== 5) return;

    let currentWord = '';
    for (let i = 0; i < 5; i++) {
      currentWord += board[currentAttempt.attempt][i];
    }

    if (wordSet.has(currentWord.toLowerCase())) {
      setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPos: 0 });
    } else {
      alert('Essa palavra não existe ou ainda não foi implementada');
    }

    if (currentWord.toLowerCase() === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true, });
      return;
    }

    if (currentAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false, });
    }

  }
  return (
    <div className="App">
      <Header />
    <AppContext.Provider value={{ board, setBoard, currentAttempt, setCurrentAttempt, onSelectLetter, onDelete, onEnter, correctWord, disabledLetters, setDisabledLetters, gameOver, setGameOver }}>
      <div className='game'>
      <Game />
      {gameOver.gameOver ? <GameOver /> : <Keyboard />}
      </div>
    </AppContext.Provider>
    </div>
  );
}

export default App;
