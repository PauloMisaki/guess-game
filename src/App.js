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
  const [correctWord, setCorrectWord] = useState('');
  const [gameOver, setGameOver] = useState({ gameOver: false, guessedWord: false, });
  const [errorVisibility, setErrorVisibility] = useState(false);

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.chosenWord);
    })
  }, [])

  const onSelectLetter = (keyVal) => {
    if (currentAttempt.letterPos > 4) return;
    setErrorVisibility(false);
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyVal;
    setBoard(newBoard)
    setCurrentAttempt({...currentAttempt, letterPos: currentAttempt.letterPos + 1});
  }
  const onDelete = () => {
    if (currentAttempt.letterPos === 0) return;
    setErrorVisibility(false);
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
      const newBoard = [...board];
      newBoard[currentAttempt.attempt][0] = '';
      newBoard[currentAttempt.attempt][1] = '';
      newBoard[currentAttempt.attempt][2] = '';
      newBoard[currentAttempt.attempt][3] = '';
      newBoard[currentAttempt.attempt][4] = '';
      setBoard(newBoard);
      setCurrentAttempt({...currentAttempt, letterPos: 0});
      setErrorVisibility(true);
      return;
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
      {errorVisibility && <h3 className='error-warning'>Essa palavra ainda não foi implementada ou não existe!</h3>}
      {gameOver.gameOver ? <GameOver /> : <Keyboard />}
      </div>
    </AppContext.Provider>
    </div>
  );
}

export default App;
