import React from 'react';

export function Grid(props) {
  let result = [];

  props.grid.forEach((row, i) => {
    let cells = [];
    row.forEach((cell, i) => {
      cells.push(<div className={'grid__cell cell-' + cell} key={i} />);
    });
    result.push(
      <div className='grid__row' key={i}>
        {cells}
      </div>
    );
  });

  return <div className='game__grid'>{result}</div>;
}

export default Grid;
