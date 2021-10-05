import * as React from "react";
import { render } from "react-dom";
import "./style.css";

enum Marker {
  x = "X",
  o = "O"
}

const Squares = ({
  key,
  text,
  plays,
  play,
  currentPlayer
}: {
  key: number;
  text: number;
  marker: Marker | undefined;
  currentPlayer: Marker;
  plays: Map<number, Marker>;
  play: (event, number, Marker) => void;
}) => (
  <div
    key={key}
    onClick={(e) => play(e, text as number, currentPlayer)}
    className={"square"}
  >
    {plays.has(text) ? plays.get(text) : "open"}
  </div>
);

const winningLines: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [2, 5, 7]
];

const App = () => {
  const [winner, setWinner] = React.useState<Marker | undefined>(undefined);
  const [playsState, setPlaysState] = React.useState<Map<number, Marker>>(
    new Map<number, Marker>([])
  );
  const [currentPlayer, setCurrentPlayer] = React.useState<Marker>(Marker.o);
  const checkForWin = (): boolean => {
    return winningLines.some((line) =>
      line.every((x) => playsState.get(x) === currentPlayer)
    );
  };

  const play = (
    event: React.MouseEvent<HTMLDivElement>,
    text: number
  ): void => {
    event.preventDefault();
    setPlaysState(playsState.set(text, currentPlayer));
    if (checkForWin()) {
      setWinner(currentPlayer);
    }
    setCurrentPlayer(currentPlayer === Marker.x ? Marker.o : Marker.x);
  };
  const getGrid = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].map((x, i) => {
      return (
        <Squares
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

  if (winner) {
    return (
      <h1>
        The winner is: {winner}{" "}
        <button
          onClick={() => {
            setPlaysState(new Map());
            setWinner(undefined);
          }}
        >
          Play Again
        </button>
      </h1>
    );
  }

  return (
    <div>
      <h1>Current Player: {currentPlayer}</h1>
      <div className={"grid"}>{getGrid()}</div>
      <button onClick={() => setPlaysState(new Map())}>Start Again?</button>
    </div>
  );
};

render(<App />, document.getElementById("root"));
