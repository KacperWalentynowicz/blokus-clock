import MyTimer from './Clock.js'
import './App.css';
import {useCallback, useState} from "react";
const MINS_TO_MILLISECONDS = 60000;

function App() {
  const players = [
    {
      color: 'blue',
      key: 'blue',
      index: 0,
    },
    {
      color: 'yellow',
      key: 'yellow',
      index: 1,
    },
    {
      color: 'green',
      key: 'green',
      index: 2,
    },
    {
      color: 'red',
      key: 'red',
      index: 3
    }]


  const [turn, setTurn] = useState(-1)
  const [timerDuration, setTimerDuration] = useState(10);
  const [gameStarted, setGameStarted] = useState(false);
  const [finishTimestamp, setFinishTimestamp] = useState(null);
  const [memoizedTurn, setMemoizedTurn] = useState(-1);

  const nextPlayerTurn = useCallback(() => {
    setTurn(turn => (turn + 1) % 4)
  }, [setTurn]);

  const handleInputChange = event => {
    const result = event.target.value.replace(/\D/g, '');
    setTimerDuration(result);
    setFinishTimestamp(new Date(Date.now() + MINS_TO_MILLISECONDS * result));
  };

  const startGame = useCallback(() => {
    setFinishTimestamp(new Date(Date.now() + MINS_TO_MILLISECONDS * timerDuration));
    setTurn(0);
    setGameStarted(true);
  }, [setTurn, timerDuration, setGameStarted, setFinishTimestamp]);

  const handlePause = useCallback(() => {
    if (memoizedTurn === -1) {
      setMemoizedTurn(turn);
      setTurn(-1);
    }
    else {
      setTurn(memoizedTurn);
      setMemoizedTurn(-1);
    }
  }, [setTurn, setMemoizedTurn, turn, memoizedTurn]);

    return (
      <div style={{textAlign: 'center'}}>
        <p>Blokus Clock! Needs some more work but playable, enjoy... </p>
        <div>Minutes per player{" "}{" "}
          <input
            type='text'
            pattern='[0-9]'
            onChange={handleInputChange}
            value={timerDuration}
          />
        </div>
        {!gameStarted ? <button
        onClick={startGame}
        >
          Start game!
        </button> : null}
        {gameStarted ? <button
          onClick={handlePause}
        >
          {memoizedTurn === -1 ? 'Pause' : 'Resume'}
        </button> : null}
        <div>
          {gameStarted && players.map(player => {
            return <
              MyTimer color={player.color}
              key={player.key}
              expireTimeInSeconds={finishTimestamp}
              isActive={turn === player.index}
              onClick={nextPlayerTurn}
            />
          })}
        </div>
      </div>
    );
}

export default App;
