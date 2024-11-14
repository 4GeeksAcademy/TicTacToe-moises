import React, { useState } from "react";

const Home = ({
  initialPlayer1 = "",
  initialPlayer2 = "",
  initialSymbol1 = null,
  initialSymbol2 = null,
  initialSquares = Array(9).fill(null),
}) => {
  const [isSetup, setIsSetup] = useState(true);
  const [player1, setPlayer1] = useState(initialPlayer1);
  const [player2, setPlayer2] = useState(initialPlayer2);
  const [symbol1, setSymbol1] = useState(initialSymbol1); 
  const [symbol2, setSymbol2] = useState(initialSymbol2); 
  const [squares, setSquares] = useState(initialSquares);
  const [isXNext, setIsXNext] = useState(true);
  const [showVictory, setShowVictory] = useState(false);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(squares);
  const currentPlayer = isXNext ? player1 : player2;
  const currentSymbol = isXNext ? symbol1 : symbol2;
  const winnerPlayer = winner === symbol1 ? player1 : winner === symbol2 ? player2 : null;
  const status = winnerPlayer ? `Ganador: ${winnerPlayer}` : `Turno de: ${currentPlayer}`;

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = currentSymbol;
    setSquares(newSquares);
    setIsXNext(!isXNext);

    if (calculateWinner(newSquares)) {
      setTimeout(() => setShowVictory(true), 300);
    }
  };

  const restartGame = () => {
    window.location.reload();
  };

  const startGame = (player1Name, player2Name, symbol1Choice, symbol2Choice) => {
    setPlayer1(player1Name);
    setPlayer2(player2Name);
    setSymbol1(symbol1Choice);
    setSymbol2(symbol2Choice);
    setIsSetup(false);
  };

  const handleSymbol1Click = (symbol) => {
    if (symbol === symbol1) {
      setSymbol1(null); 
    } else if (symbol !== symbol2) {
      setSymbol1(symbol); 
    }
  };

  const handleSymbol2Click = (symbol) => {
    if (symbol === symbol2) {
      setSymbol2(null); 
    } else if (symbol !== symbol1) {
      setSymbol2(symbol); 
    }
  };

  return (
    <div className="game-container">
      <h1 className="title">TicTacToe</h1>
      {isSetup ? (
        <div className="setup-container">
          <h1>Coloca tu Nombre y elige tu Simbolo</h1>
          <div className="input-group">
            <div className="player-input-container">
              <input
                type="text"
                placeholder="Jugador 1"
                value={player1}
                onChange={(e) => setPlayer1(e.target.value)}
                className="player-input"
              />
              <div className="symbol-selection">
                <button
                  onClick={() => handleSymbol1Click("X")}
                  className={symbol1 === "X" ? "active" : ""}
                  disabled={symbol2 === "X"}
                >
                  X
                </button>
                <button
                  onClick={() => handleSymbol1Click("O")}
                  className={symbol1 === "O" ? "active" : ""}
                  disabled={symbol2 === "O"}
                >
                  O
                </button>
              </div>
            </div>

            <div className="player-input-container">
              <input
                type="text"
                placeholder="Jugador 2"
                value={player2}
                onChange={(e) => setPlayer2(e.target.value)}
                className="player-input"
              />
              <div className="symbol-selection">
                <button
                  onClick={() => handleSymbol2Click("X")}
                  className={symbol2 === "X" ? "active" : ""}
                  disabled={symbol1 === "X"}
                >
                  X
                </button>
                <button
                  onClick={() => handleSymbol2Click("O")}
                  className={symbol2 === "O" ? "active" : ""}
                  disabled={symbol1 === "O"}
                >
                  O
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => startGame(player1, player2, symbol1, symbol2)}
            className="start-button"
            disabled={!symbol1 || !symbol2 || !player1 || !player2}
          >
            Iniciar Juego
          </button>
        </div>
      ) : showVictory ? (
        <div className="setup-container">
          <h1 className="victory-message">{winnerPlayer} <br /> ha ganado</h1>
          <button className="restart-button" onClick={restartGame}>
            Reiniciar Juego
          </button>
        </div>
      ) : (
        <div className="game-board">
          <div className="status">{status}</div>
          <div className="board">
            {squares.map((square, index) => (
              <button
                key={index}
                className="square-button"
                onClick={() => handleClick(index)}
              >
                {square === "X" && <i className="fa-solid fa-xmark"></i>}
                {square === "O" && <i className="fa-brands fa-opera"></i>}
              </button>
            ))}
          </div>
          <button className="restart-button" onClick={restartGame}>
            Reiniciar Juego
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
