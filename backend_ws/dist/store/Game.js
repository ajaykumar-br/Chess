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
            console.log("sending move to player 2");
            this.player2.send(JSON.stringify({
                type: messages_1.MOVE,
                move,
                board: this.board.fen()
            }));
        }
        else {
            console.log("sending move to player 1");
            this.player1.send(JSON.stringify({
                type: messages_1.MOVE,
                move,
                board: this.board.fen(),
            }));
        }
    }
}
exports.Game = Game;
