import { Color, PieceSymbol, Square } from "chess.js";

export const Chessboard = ({
  board
}: {board:({
  square: Square;
  type: PieceSymbol;
  color: Color;
} | null)[][]}) => {
  return (
    <div className="text-white">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              return (
                <div key={j} className={`w-20 h-20 flex justify-center items-center border ${(i+j)%2 === 0? 'bg-red-300': 'bg-red-600'}`}>
                  {square? square.type: ""}
                </div>
              )
            })}
          </div>
        );
      })}
    </div>
  );
};
