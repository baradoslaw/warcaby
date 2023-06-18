const isValidPosition = (row: number, col: number): boolean => row >= 0 && row < 8 && col >= 0 && col < 8;

export const validateMove = (boardInString: string, startRow: number, startCol: number, endRow: number, endCol: number, playerColor: string): boolean => {
  const boardInArray = boardInString.split(',');
  const boardState: Array<string[]> = [];

  for (let i = 0; i < 8; i++) {
    const start = i * 8;
    const subArray = boardInArray.slice(start, start + 8);
    boardState.push(subArray);
  }

  if (!isValidPosition(startRow, startCol)) {
    return false;
  }

  if (!isValidPosition(endRow, endCol)) {
    return false;
  }

  if (boardState[startRow][startCol].toLowerCase() !== playerColor.toLowerCase()) {
    return false;
  }

  if (boardState[endRow][endCol] !== '0') {
    return false;
  }

  const rowDiff = Math.abs(endRow - startRow);
  const colDiff = Math.abs(endCol - startCol);
  if (rowDiff !== colDiff) {
    return false;
  }

  // Sprawdzanie czy ruch zbija pionka i jeśli tak to w prawidłowy sposób
  if (rowDiff === 1) {
    return true;
  } else if (rowDiff === 2) {
    const jumpRow = (startRow + endRow) / 2;
    const jumpCol = (startCol + endCol) / 2;

    // Check if there is an opponent's piece to jump over
    if (boardState[jumpRow][jumpCol].toLowerCase() !== playerColor.toLowerCase()) {
      return true;
    }
  }

  return false;
};
