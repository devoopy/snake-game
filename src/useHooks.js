import { useState, useEffect, useRef } from 'react';

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function useDirection() {
  const [direction, setDirection] = useState(null);
  const code = useKeyboard();

  useEffect(() => {
    switch (code) {
      case 'ArrowUp':
      case 'KeyW':
        setDirection([-1, 0]);
        break;
      case 'ArrowDown':
      case 'KeyS':
        setDirection([1, 0]);
        break;
      case 'ArrowRight':
      case 'KeyD':
        setDirection([0, 1]);
        break;
      case 'ArrowLeft':
      case 'KeyA':
        setDirection([0, -1]);
        break;
    }
  }, [code]);

  return direction;
}

function useKeyboard() {
  const [keyDown, setKeyDown] = useState(null);

  function downHandler({ code }) {
    setKeyDown(code);
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, []);

  return keyDown;
}
