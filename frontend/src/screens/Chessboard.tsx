import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";

export const Chessboard = ({
  board, socket, chess, setBoard
}: {board:({
  square: Square;
  type: PieceSymbol;
  color: Color;
} | null)[][]; 
socket: WebSocket;
chess: Chess;
setBoard: React.Dispatch<React.SetStateAction<({
  square: Square;
  type: PieceSymbol;
  color: Color;
} | null)[][]>>;
}) => {
  const [from, setFrom] = useState<null | string>(null);

  return (
    <div className="text-white">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const squareName = `${String.fromCharCode(97+j)}${8-i}`;

              return (
                <div onClick={() => {
                  if(!from){
                    setFrom(squareName);
                  } else {
                    socket.send(JSON.stringify({
                        type: "move",
                        move: {
                          from,
                          to: squareName,
                        },
                      }));

                    setFrom(null);
                    console.log({ from, to: squareName });
                    chess.move({
                      from,
                      to: squareName,
                    });
                    setBoard(chess.board());
                  }
                }} key={j} className={`w-20 h-20 flex justify-center items-center border ${(i+j)%2 === 0? 'bg-green-200': 'bg-green-600'}`}>
                  {square? <img className="w-16" src={`${square?.color === 'b'? `${'b'+square?.type}` : `${'w'+square?.type}`}.png`} /> : null}
                </div>
              )
            })}
          </div>
        );
      })}
    </div>
  );
};
