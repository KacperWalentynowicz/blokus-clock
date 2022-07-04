import MyTimer from './Clock.js'
import './App.css';

function App() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
    return (
      <div style={{textAlign: 'center'}}>
      <p>Blokus Clock! Still needs some work though... </p>
      <div>
        <MyTimer color={'red'} expireTimeInSeconds={time} initiallyRunning={false} />
        <MyTimer color={'blue'} expireTimeInSeconds={time} initiallyRunning={false} />
        <MyTimer color={'green'} expireTimeInSeconds={time} initiallyRunning={false} />
        <MyTimer color={'yellow'} expireTimeInSeconds={time} initiallyRunning={false} />
      </div>
      </div>
    );
}

export default App;
