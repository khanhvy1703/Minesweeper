import { CellType } from "./types";

export const generateBoard = (maxRow:number, maxCol:number):CellType[][] => {
  const board:CellType[][] = [];
  let key:number = 0;

  for (let i = 0; i < maxRow; i++) {
    board.push([]);
    for (let j = 0; j < maxCol; j++) {
      board[i].push({
        key,
        bombs: 0,
      });
      key++;
    }
  }

  return board;
}