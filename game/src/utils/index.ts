import { EIGHT_COLOR, FIVE_COLOR, FOUR_COLOR, ONE_COLOR, SEVEN_COLOR, SIX_COLOR, THREE_COLOR, TWO_COLOR } from "./constant";
import { CellType } from "./types";

const generateRandomNum = (max:number) => {
  return Math.floor(Math.random() * max);
}

const getAdjacentCell = (row:number, col:number, board:CellType[][]):CellType | null => {
  const maxCol = board.length;
  const maxRow = board[0].length;
  return row < 0 || col < 0 || row >= maxRow || col >= maxCol ? null : board[row][col];
}

export const generateNumColor = (bombs: number) => {
  switch (bombs) {
    case 1:
      return ONE_COLOR;
    case 2:
      return TWO_COLOR;
    case 3:
      return THREE_COLOR;
    case 4:
      return FOUR_COLOR;
    case 5:
      return FIVE_COLOR;
    case 6:
      return SIX_COLOR;
    case 7:
      return SEVEN_COLOR;
    case 8:
      return EIGHT_COLOR;
    default:
      return '';
  }
};

export const generateBoard = (maxRow:number, maxCol:number, maxBomb:number):CellType[][] => {
  // generate the board
  const board:CellType[][] = [];
  let key:number = 0;
  for (let i = 0; i < maxRow; i++) {
    board.push([]);
    for (let j = 0; j < maxCol; j++) {
      board[i].push({
        key,
        bombs: 0,
        isVisible: true,
      });
      key++;
    }
  }

  // generate bombs randomly
  let bombsAdded:number = 0;
  while (bombsAdded < maxBomb) {
    const rowBomb = generateRandomNum(maxRow);
    const colBomb = generateRandomNum(maxCol);
    const currentCell = board[rowBomb][colBomb];
    
    if (currentCell.bombs !== -1) {
      board[rowBomb][colBomb] = {
        ...currentCell,
        bombs: -1,
      }
    }
    bombsAdded++;
  } 

  // generate the numbers 
  for (let row = 0; row < maxRow; row++) {
    for (let col = 0; col < maxCol; col++) {
      const currentCell = board[row][col];
      const topLeft = getAdjacentCell(row - 1, col - 1, board);
      const topMid = getAdjacentCell(row - 1, col, board);
      const topRight = getAdjacentCell(row - 1, col + 1, board);
      const midLeft = getAdjacentCell(row, col - 1, board);
      const midRight = getAdjacentCell(row, col + 1, board);
      const bottomLeft = getAdjacentCell(row + 1, col - 1, board);
      const bottomMid = getAdjacentCell(row + 1, col, board);
      const bottomRight = getAdjacentCell(row + 1, col + 1, board);
      let adjacentBombs:number = 0;

      if(currentCell.bombs !== -1) {
        if (topLeft?.bombs === -1) {
          adjacentBombs++;
        } if (topRight?.bombs === -1) {
          adjacentBombs++;
        } if (topMid?.bombs === -1) {
          adjacentBombs++;
        } if (midLeft?.bombs === -1) {
          adjacentBombs++;
        } if (midRight?.bombs === -1) {
          adjacentBombs++;
        } if (bottomLeft?.bombs === -1) {
          adjacentBombs++;
        } if (bottomMid?.bombs === -1) {
          adjacentBombs++;
        } if (bottomRight?.bombs === -1) {
          adjacentBombs++;
        } 

        if (adjacentBombs > 0) {
          board[row][col] = {
            ...currentCell,
            bombs: adjacentBombs,
          }
        }
      }
    }
  }
  return board;
}