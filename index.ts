import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import {handleError} from "./utils/error";
import './utils/db';
import {gameRouter} from "./routers/game.router";

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json());

app.use('/game', gameRouter);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
  console.log('App listening on http://localhost:3001');
});
