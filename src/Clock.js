import React, {useEffect, useState} from 'react';
import { useTimer } from 'react-timer-hook';
import { useCallback, useMemo } from 'react';
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

function MyTimer({ color, expireTimeInSeconds: expiryTimestamp, initiallyRunning }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp: expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  useEffect(() => {
    if (initiallyRunning) start();
    else pause();
  }, [])

  const toggle = useCallback(() => {
    if (isRunning) pause();
    else resume();
  }, [pause, resume, isRunning]);

  return (
    <Button
      backgroundColor={color}
      onClick={toggle}
      isRunning={isRunning}
    >
    <div style={{fontSize: '100px'}}>
      <span>{minutes}</span>:<span>{seconds}</span>
    </div>
    </Button>
  );
}

export default MyTimer;