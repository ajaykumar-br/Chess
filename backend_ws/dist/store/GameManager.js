"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Game_1 = require("./Game");
const messages_1 = require("./messages");
const types_1 = require("../types/types");
class GameManager {
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandlers(socket);
    }
    removeUser(socket) { }
    addHandlers(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            console.log(message);
            if (message.type === messages_1.INIT_GAME) {
                if (this.pendingUser) {
                    const game = new Game_1.Game(socket, this.pendingUser);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = socket;
                }
            }
            if (message.type === messages_1.MOVE) {
                const game = this.games.find((game) => game.player1 === socket || game.player2 === socket);
                if (game) {
                    // check type of move using zod
                    console.log(message.move, "is the move played");
                    if (types_1.moveType.safeParse(message.move).success) {
                        game.makeMove(socket, message.move);
                    }
                }
            }
        });
    }
}
exports.GameManager = GameManager;
