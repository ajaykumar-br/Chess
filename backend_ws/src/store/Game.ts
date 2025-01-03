import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  private board: Chess;
  private moves: string[]; // "p - e2 to e4"
  private startTime: Date;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.moves = [];
    this.startTime = new Date();
    this.player1.send(JSON.stringify({
        type: INIT_GAME,
        payload: {
            color: "white",
            board: this.board.fen()
        }
    }))
    this.player2.send(
      JSON.stringify({
        type: INIT_GAME,
        payload: {
          color: "black",
          board: this.board.fen(),
        },
      })
    );
  }

  makeMove(player: WebSocket, move: {from: string, to: string}) {
    // is it the players turn?
    // is it a valid move?
    try {
        this.board.move(move);
        // *pushing move to moves array is pending which is why everytime control is going inside if only in line 70
    } catch (error) {
        console.error(error);
        return;
    }
    // update the board and push to moves array - being handled by chess.js lib

    // is the game over?
    if(this.board.isGameOver() || this.board.isStalemate()) {
      // send game over message to both players
      this.player1.send(JSON.stringify({
        type: GAME_OVER,
        payload: {
            winner: this.board.turn() === 'w'? 'black': 'white'
        }
      }));

      this.player2.send(
        JSON.stringify({
          type: GAME_OVER,
          payload: {
            winner: this.board.turn() === "w" ? "black" : "white",
          },
        })
      );

      return;
    }
    // send updated board to both players
    if(this.moves.length % 2 === 0) {
        this.player2.send(JSON.stringify({
            type: MOVE,
            move,
            board: this.board.fen()
        }));
    } else {
        this.player1.send(
          JSON.stringify({
            type: MOVE,
            move,
            board: this.board.fen(),
          })
        );
    }
  }
}