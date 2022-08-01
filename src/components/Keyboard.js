import React, { useCallback, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import Key from './Key';

export default function Keyboard() {
  const { onEnter, onDelete, onSelectLetter, disabledLetters } = useContext(AppContext)
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyboard = useCallback((e) => {
    if (e.key === 'Enter') {
      onEnter();
    } else if (e.key === 'Backspace') {
      onDelete();
    } else {
      keys1.forEach((key) => {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      keys2.forEach((key) => {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      keys3.forEach((key) => {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
    }
  })

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboard);

    return () => {
      document.removeEventListener('keydown', handleKeyboard);
    }
  }, [handleKeyboard]);

  return(
    <div className='keyboard' id='keyboard' onKeyDown={handleKeyboard}>
      <div className='line1' id='keyboard-row-1'>
        {keys1.map((key) => {
          return <Key key={key} keyVal={key} disabled={disabledLetters.includes(key)} />
        })}
      </div>
      <div className='line2' id='keyboard-row-2'>
        {keys2.map((key) => {
          return <Key key={key} keyVal={key} disabled={disabledLetters.includes(key)} />
        })}
      </div>
      <div className='line3' id='keyboard-row-3'>
        <Key key='Enter' keyVal={'ENTER'} bigKey />
        {keys3.map((key) => {
          return <Key key={key} keyVal={key} disabled={disabledLetters.includes(key)} />
        })}
        <Key key='Delete' keyVal={'DELETE'} bigKey />
      </div>
    </div>
  )
}