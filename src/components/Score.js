import React, { useState, useEffect } from 'react';

function Score(props) {
  const [time, setTime] = useState(null);

  useEffect(() => {
    let sec = props.time % 60;
    let min = (props.time - sec) / 60;
    sec = ('0' + sec).substr(-2);
    min = ('0' + min).substr(-2);
    setTime(`${min}:${sec}`);
  }, [props.time]);

  function handleClickReturn() {
    props.onReturn();
  }

  return (
    <div className='game__score'>
      <button className='return-button' onClick={handleClickReturn}>
        Назад
      </button>
      <p>{time}</p>
      <p>{props.score}</p>
    </div>
  );
}

export default Score;
