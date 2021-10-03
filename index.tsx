import * as React from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

interface AppProps {}

enum Marker {
  x = 'X',
  o = 'O',
}

const Square123 = ({
  key,
  text,
  plays,
  play,
  currentPlayer,
}: {
  key: number;
  text: number;
  marker: Marker | undefined;
  currentPlayer: Marker;
  plays: any;
  play: any;
}) => (
  <div
    key={key}
    onClick={(e) => play(e, text as number, currentPlayer)}
    className={'square'}
  >
    {plays.has(text) ? plays.get(text) : 'open'}
  </div>
);

const App = () => {
  const [playsState, setPlaysState] = React.useState<Map<number, Marker>>(
    new Map<number, Marker>([[1, Marker.x]])
  );

  const play = (event: React.MouseEvent<HTMLDivElement>, text: number) => {
    event.preventDefault();
    console.log(event.currentTarget, text);
    setPlaysState(playsState.set(text, currentPlayer));
    console.dir(Array.from(playsState));
    setCurrentPlayer(currentPlayer === Marker.x ? Marker.o : Marker.x);
  };
  const getGrid = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((x, i) => {
      return (
        <Square123
          key={i}
          marker={playsState.get(x)}
          text={x}
          currentPlayer={currentPlayer}
          plays={playsState}
          play={play}
        />
      );
    });
  };
  const [currentPlayer, setCurrentPlayer] = React.useState<Marker>(Marker.o);

  return (
    <div>
      <h1>Current Player: {currentPlayer}</h1>
      <div className={'grid'}>{getGrid()}</div>
      <button onClick={() => setPlaysState(new Map())}>Start Again?</button>
    </div>
  );
};

render(<App />, document.getElementById('root'));