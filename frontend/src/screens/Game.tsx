import { Chessboard } from './Chessboard'
import Button from '../components/Button';
import { useSocket } from '../hooks/useSocket';
import { useEffect, useState } from 'react';
import { Chess } from "chess.js";

const Game = () => {
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());

    useEffect(() => {
      if(!socket)
        return;
      socket.onmessage = (e) => {
        const message = JSON.parse(e.data);
        console.log(message);
        switch(message.type) {
          case "init_game": 
            setChess(new Chess());
            setBoard(chess.board());
            console.log("Game Initialized");
            break;
          case "move":
            const move = message.payload;
            chess.move(move);
            setBoard(chess.board());
            console.log("Piece Moved");
            break;
          case "game_over":
            console.log("Game Over");
            break;
        }
      }
    }, [socket]);
    
  if (!socket) {
    return <div>Connecting...</div>
  }
  return (
    <div className='flex justify-center h-screen'>
      <div className="">
        <Chessboard board={board} />
      </div>
      <div className="">
        <Button onClick={() => {
          socket.send(JSON.stringify({
            type: "init_game"
          }))
        }}>
          Start Game
        </Button>
      </div>
    </div>
  );
}

export default Game