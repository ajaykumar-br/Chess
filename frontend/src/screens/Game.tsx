import { Chessboard } from './Chessboard'
import Button from '../components/Button';
import { useSocket } from '../hooks/useSocket';
import { useEffect, useState } from 'react';
import { Chess } from "chess.js";

const Game = () => {
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [started, setStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
      if(!socket)
        return;
      socket.onmessage = (e) => {
        const message = JSON.parse(e.data);
        switch(message.type) {
          case "init_game": 
            setChess(new Chess());
            setBoard(chess.board());
            console.log("Game Initialized");
            break;
          case "move":
            try{
              chess.move(message.move);
            } catch(e) {
              console.error(e);
            }
            setBoard(chess.board());
            console.log("Piece Moved");
            break;
          case "game_over":
            setGameOver(true);
            console.log("Game Over");
            break;
        }
      }
    }, [socket, board, chess]);
    
  if (!socket) {
    return <div>Connecting...</div>
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex">
        {gameOver && <h1>Game Over</h1>}
      </div>
      <div className="">
        <Chessboard
          board={board}
          socket={socket}
          setBoard={setBoard}
          chess={chess}
        />
      </div>
      <div className="flex h-[83%] justify-center items-center w-[30%] mx-6 bg-slate-800">
        {!started && (
          <Button onClick={() => {
              setStarted(true);
              socket.send(
                JSON.stringify({
                  type: "init_game",
                })
              );
            }}
          >
            Start Game
          </Button>
        )}
      </div>
    </div>
  );
}

export default Game