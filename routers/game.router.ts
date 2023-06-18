import {Router} from "express";
import {GameRecord} from "../records/game.record";
import {validateMove} from "../utils/validate-move";
import {ValidationError} from "../utils/error";

export const gameRouter = Router()
  .post('/create-new-game', async (req, res) => {
    const game = new GameRecord(req.body);
    await game.insertNewGame();
    res.json(game);
  })

  .post('/update-game-state', async (req, res) => {
    const {startRow, startCol, endRow, endCol, playerColor} = req.body;

    const game = new GameRecord(req.body);

    if (!validateMove(game.gameBoard, startRow, startCol, endRow, endCol, playerColor))
      throw new ValidationError('Nieprawidłowy ruch!');

    await game.updateGameState();
    res.json(game);
  });
