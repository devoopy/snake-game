import React, { useState } from 'react';
import GameBox from './GameBox';
import Menu from './Menu';

function Game() {
  const [result, setResult] = useState(<Menu onPlay={handlePlay} />);

  function handlePlay() {
    setResult(<GameBox onReturn={handleReturn} />);
  }

  function handleReturn() {
    setResult(<Menu onPlay={handlePlay} />);
  }

  return <div className='Game'>{result}</div>;
}

export default Game;
