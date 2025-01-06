"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.moves = [];
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "white",
                board: this.board.fen()
            }
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "black",
                board: this.board.fen(),
            },
        }));
    }
    makeMove(player, move) {
        // is it the players turn?
        // is it a valid move?
        try {
            this.board.move(move);
            this.moves.push(`${move.from + " - " + move.to}`);
            console.log("move made", this.moves);
            // *pushing move to moves array is pending which is why everytime control is going inside if only in line 70
        }
        catch (error) {
            console.error(error);
            return;
        }
        // update the board and push to moves array - being handled by chess.js lib
        // is the game over?
        if (this.board.isGameOver() || this.board.isStalemate()) {
            // send game over message to both players
            this.player1.send(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === 'w' ? 'black' : 'white'
                }
            }));
            this.player2.send(JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() === "w" ? "black" : "white",
                },
            }));
            return;
        }
        // send updated board to both players
        if (this.moves.length % 2 === 0) {
            this.player1.send(JSON.stringify({
                type: messages_1.MOVE,
                move
            }));
        }
        else {
            this.player2.send(JSON.stringify({
                type: messages_1.MOVE,
                move
            }));
        }
    }
}
exports.Game = Game;
