import {Router} from "express";
import {GameRecord} from "../records/game.record";

export const gameRouter = Router()
  .post('/create-new-game', async (req, res) => {
    const game = new GameRecord(req.body);
    await game.insertNewGame();
    res.json(game);
  })

  .post('/update-game-state', async (req, res) => {
    const game = new GameRecord(req.body);
    //@TODO Walidacja ruchu
    await game.updateGameState();
    res.json(game);
  });
