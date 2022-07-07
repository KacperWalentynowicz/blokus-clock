import MyTimer from './Clock.js'
import './App.css';
import { useCallback, useState } from "react";
import { Draggable } from "react-drag-reorder";
import styled from "styled-components";
import { theme } from "./Clock";

const MINS_TO_MILLISECONDS = 60000;
const DropdownButton = styled.div`
  background-color: ${(props) => theme[props.backgroundColor].playing};;
  width: 50px;
  height: 50px;
`;

const DropdownMenu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 400px;
  align-content: center;
  margin:0 auto;
`;
function App() {
  const [players, setPlayers] = useState([
    {
      color: 'blue',
      key: 'blue'
    },
    {
      color: 'yellow',
      key: 'yellow',
    },
    {
      color: 'green',
      key: 'green',
    },
    {
      color: 'red',
      key: 'red',
    }]);


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
    for (let i = 0; i < players.length; ++i) {
      players[i].index = i;
    }
    setFinishTimestamp(new Date(Date.now() + MINS_TO_MILLISECONDS * timerDuration));
    setTurn(0);
    setGameStarted(true);
  }, [setTurn, timerDuration, setGameStarted, setFinishTimestamp, players]);

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
  const getChangedPos = (currentPos, newPos) => {
    setPlayers(players => {
      const movedElement = players[currentPos];
      players.splice(currentPos, 1);
      players.splice(newPos, 0, movedElement);
      return players;
    })
  };
  return (
    <div style={{textAlign: 'center'}}>
      <p>Blokus Clock! Needs some more work but playable, enjoy... </p>
      <div style={{height: 40}}>Minutes per player{" "}{" "}
        <input
          type='text'
          pattern='[0-9]'
          onChange={handleInputChange}
          value={timerDuration}
        />
      </div>
      {!gameStarted ?
        <div>
        <DropdownMenu>
        Order of players:
        <Draggable onPosChange={getChangedPos}>
          {players.map((player, idx) => {
            return (
              <div key={idx} className="flex-item">
                {<DropdownButton backgroundColor={player.color}></DropdownButton>}
              </div>
            );
          })}
        </Draggable>
        <button onClick={startGame}>
        Start game!
        </button>
        </DropdownMenu>
        </div>
        : null}
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
