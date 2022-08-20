import React, { useState, useEffect, useRef } from 'react';
import { useInterval, useDirection } from '../useHooks';
import Grid from './Grid';
import Score from './Score';

function GameBox(props) {
  const snake = useRef([[0, 0]]);
  const defaultGrid = newGrid(10, 10);
  const [grid, setGrid] = useState([]);
  const [food, setFood] = useState([0, 1]);
  const [step, setStep] = useState(0);
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(1);
  const [direction, setDirection] = useState([0, 1]);
  const [newDirection, setNewDirection] = useState([0, 1]);
  const keyDirection = useDirection();

  useEffect(() => {
    moveDirection();
  }, [keyDirection]);

  useEffect(() => {
    const freshGrid = refreshGrid();
    setGrid(freshGrid);
    setDirection(newDirection);
  }, [step]);

  useInterval(tick, 500);
  useInterval(timer, 1000);

  function tick() {
    check();
    move();
    setStep((s) => ++s);
  }

  function timer() {
    setTime((s) => ++s);
  }

  function refreshGrid() {
    const grid = defaultGrid;

    if (food) {
      const i = food[0];
      const j = food[1];
      grid[i][j] = 6;
    }

    snake.current.forEach((e) => {
      const i = e[0];
      const j = e[1];
      grid[i][j] = 1;
    });

    const head = snake.current[snake.current.length - 1];
    const i = head[0];
    const j = head[1];
    const x = newDirection[1];
    const y = newDirection[0];
    grid[i][j] = (4 + x) * x ** 2 + (3 + y) * y ** 2;

    return grid;
  }

  function refreshFoodPosition() {
    const n = defaultGrid.length;
    const m = defaultGrid[0].length;
    let i, j;

    loop: do {
      i = random(0, n - 1);
      j = random(0, m - 1);
      for (const e of snake.current) {
        if (i === e[0] && j === e[1]) {
          continue loop;
        }
      }
      break;
    } while (true);

    setFood([i, j]);
  }

  function moveDirection() {
    if (
      keyDirection &&
      keyDirection[0] !== direction[0] &&
      keyDirection[1] !== direction[1]
    ) {
      setNewDirection(keyDirection);
    }
  }

  function check() {
    const head = snake.current[snake.current.length - 1];
    const i = head[0] + newDirection[0];
    const j = head[1] + newDirection[1];

    if (i >= defaultGrid.length || j >= defaultGrid[0].length) {
      stop();
      return;
    } else if (i < 0 || j < 0) {
      stop();
      return;
    }
    for (const e of snake.current) {
      if (i === e[0] && j === e[1]) {
        stop();
        return;
      }
    }
  }

  function move() {
    const head = snake.current[snake.current.length - 1];
    const i = head[0] + newDirection[0];
    const j = head[1] + newDirection[1];

    if (i !== food[0] || j !== food[1]) {
      cutTail();
    } else {
      refreshFoodPosition();
      setScore((s) => ++s);
    }

    snake.current.push([i, j]);
  }

  function cutTail() {
    snake.current.shift();
  }

  function stop() {
    handleReturn();
  }

  function handleReturn() {
    props.onReturn();
  }

  return (
    <div className="box">
      <Score time={time} score={score} onReturn={handleReturn} />
      <Grid grid={grid} />
    </div>
  );
}

function newGrid(n, m) {
  const result = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < m; j++) {
      row.push(0);
    }
    result.push(row);
  }
  return result;
}

function random(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

export default GameBox;
