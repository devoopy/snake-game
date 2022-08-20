import React from 'react';

function Menu(props) {
  function handleClickPlay() {
    props.onPlay();
  }

  return (
    <div className='menu'>
      <button onClick={handleClickPlay}>Играть</button>
    </div>
  );
}

export default Menu;
