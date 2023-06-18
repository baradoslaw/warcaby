export interface GameEntity {
  sessionId: string;
  player1: string;
  player1Nick: string;
  player2: string;
  player2Nick: string;
  gameBoard: string;
  currentMove: number;
}

export interface NewGameEntity extends Omit<GameEntity, 'sessionId'> {
  sessionId?: string;
}
