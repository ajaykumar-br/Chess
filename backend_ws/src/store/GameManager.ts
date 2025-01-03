import { WebSocket } from "ws";
import { Game } from "./Game";
import { INIT_GAME, MOVE } from "./messages";
import { moveType } from "../types/types";


export class GameManager {
  private games: Game[];
  private pendingUser: WebSocket | null;
  private users: WebSocket[];

  constructor() {
    this.games = [];
    this.pendingUser = null;
    this.users = [];
  }

  addUser(socket: WebSocket) {
    this.users.push(socket);
    this.addHandlers(socket);
  }

  removeUser(socket: WebSocket) {}

  private addHandlers(socket: WebSocket) {
    socket.on("message", (data) => {
        const message = JSON.parse(data.toString());

        if(message.type === INIT_GAME) {
            if(this.pendingUser) {
                const game = new Game(socket, this.pendingUser);
                this.games.push(game);
                this.pendingUser = null;
            } else {
                this.pendingUser = socket;
            }
        }

        if (message.type === MOVE) {
            const game = this.games.find((game) => game.player1 === socket || game.player2 === socket);
            if(game) {
                // check type of move using zod
                if(moveType.safeParse(message.move).success) {
                    game.makeMove(socket, message.move);
                }
                
            }
        }
    })
  }
}