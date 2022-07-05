import MyTimer from './Clock.js'
import './App.css';
import {useCallback, useState} from "react";
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
  const time = new Date();

  const nextPlayerTurn = useCallback(() => {
    setTurn(turn => (turn + 1) % 4)
  }, [setTurn]);

  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
    return (
      <div style={{textAlign: 'center'}}>
        <p>Blokus Clock! Still needs some work though... </p>
        <button
        onClick={() => setTurn(0)}
        >
          Start game!
        </button>
        <div>
          {players.map(player => {
            return <
              MyTimer color={player.color}
              key={player.key}
              expireTimeInSeconds={time}
              isActive={turn === player.index}
              onClick={nextPlayerTurn}
            />
          })}
        </div>
      </div>
    );
}

export default App;
