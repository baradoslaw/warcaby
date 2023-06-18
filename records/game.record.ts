import {v4 as uuid} from "uuid";

import {GameEntity, NewGameEntity} from "../types";
import {pool} from "../utils/db";

export class GameRecord implements GameEntity {
  public sessionId: string;
  public player1: string;
  public player1Nick: string;
  public player2: string;
  public player2Nick: string;
  public gameBoard: string;
  public currentMove: number;

  constructor(obj: NewGameEntity) {
    this.sessionId = obj.sessionId;
    this.player1 = obj.player1;
    this.player1Nick = obj.player1Nick;
    this.player2 = obj.player2;
    this.player2Nick = obj.player2Nick;
    this.gameBoard = obj.gameBoard;
    this.currentMove = obj.currentMove;
  }

  async insertNewGame(): Promise<void> {
      this.sessionId = uuid();
      this.player1 = uuid();
      this.player2 = uuid();

      const firstPlayer = Math.floor(Math.random() * 2 + 1);
      if (firstPlayer === 2) {
        const tmpPlayer = this.player1;
        const tmpNick = this.player1Nick;
        this.player1 = this.player2;
        this.player1Nick = this.player2Nick;
        this.player2 = tmpPlayer;
        this.player2Nick = tmpNick;
      }

      this.gameBoard = '0,B,0,B,0,B,0,B,B,0,B,0,B,0,B,0,0,B,0,B,0,B,0,B,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,W,0,W,0,W,0,W,0,0,W,0,W,0,W,0,W,W,0,W,0,W,0,W,0';
      this.currentMove = 1;

      await pool.execute("INSERT INTO `game_sessions`(`sessionId`, `player1`, `player1Nick`, `player2`, `player2Nick`, `gameBoard`, `currentMove`) VALUES (:sessionId, :player1, :player1Nick, :player2, :player2Nick, :gameBoard, :currentMove)", this);
  }

  async updateGameState(): Promise<void> {
    this.currentMove = this.currentMove === 1 ? 2 : 1;

    await pool.execute("UPDATE `game_sessions` SET `gameBoard` = :gameBoard, `currentMove` = :currentMove WHERE `sessionId` = :sessionId", {
      gameBoard: this.gameBoard,
      currentMove: this.currentMove,
      sessionId: this.sessionId,
    });
  }
}
