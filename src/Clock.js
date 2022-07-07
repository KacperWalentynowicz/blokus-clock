import React, {useEffect} from 'react';
import { useTimer } from 'react-timer-hook';
import { useCallback } from 'react';
import styled from 'styled-components';

const theme = {
  red: {
    default: 'rgba(255, 0, 0, 0.3)',
    playing: 'rgba(255, 0, 0, 1)'
  },
  blue: {
    default: 'rgba(0, 0, 255, 0.2)',
    playing: 'rgba(0, 0, 255, 0.8)'
  },
  yellow: {
    default: 'rgba(255, 255, 0, 0.3)',
    playing: 'rgba(255, 255, 0, 1)'
  },
  green: {
    default: 'rgba(0, 255, 0, 0.2)',
    playing: 'rgba(0, 255, 0, 1)'
  }
};
const Button = styled.button`
  background-color: ${(props) => props.isRunning ? theme[props.backgroundColor].playing : theme[props.backgroundColor].default};
  color: black;
  width: 400px;
  height: 200px;
`;

function MyTimer({ color, expireTimeInSeconds: expiryTimestamp, isActive, onClick }) {
  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
  } = useTimer({ expiryTimestamp: expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  useEffect(() => {
    start();
    pause();
  }, [])

  useEffect(() => {
    if (isActive && !isRunning) resume();
    if (!isActive && isRunning) pause();
  }, [isActive, isRunning, resume, pause])

  const handleClick = useCallback(() => {
    if (!isRunning) return;
    pause();
    onClick();
  }, [isRunning, pause, onClick]);

  return (
    <Button
      backgroundColor={color}
      onClick={handleClick}
      isRunning={isRunning}
    >
    <div style={{fontSize: '100px'}}>
      <span>{minutes}</span>:<span>{format_two(seconds)}</span>
    </div>
    </Button>
  );
}

function format_two(value) {
  if (value < 10) return '0' + value
  else return value
}
export default MyTimer;