import React from 'react';

export default function Header() {
  return(
    <nav>
      <h1>
        GUESS
      </h1>
      <div className='positionBtn'>
        <a href='https://www.github.com/PauloMisaki' className='refBtn' target="_blank" rel="noreferrer">Github</a>
        <a href='https://www.linkedin.com/in/paulo-henrique-fullstack-dev' className='refBtn' target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </nav>    
  )
}