import { 
  BEGINNER_BOMBS, 
  BEGINNER_COLUMN, 
  BEGINNER_ROW, 
  EIGHT_COLOR, 
  EXPERT_BOMBS, 
  EXPERT_COLUMN, 
  EXPERT_ROW, 
  FIVE_COLOR, 
  FOUR_COLOR, 
  INTERMEDIATE_BOMBS, 
  INTERMEDIATE_COLUMN, 
  INTERMEDIATE_ROW, 
  ONE_COLOR, 
  SEVEN_COLOR, 
  SIX_COLOR, 
  THREE_COLOR, 
  TWO_COLOR 
} from "./constant";
import { BoardType, CellType, Level } from "./types";

const generateRandomNum = (max:number) => {
  return Math.floor(Math.random() * max);
}

const getAdjacentCell = (row:number, col:number, board:CellType[][]):CellType | null => {
  const maxRow = board.length;
  const maxCol = board[0].length;
  return row < 0 || col < 0 || row >= maxRow || col >= maxCol ? null : board[row][col];
}

export const generateBoardByLevel = (level:Level):BoardType => {
  switch(level) {
    case Level.intermediate: return {board: generateBoard(INTERMEDIATE_ROW, INTERMEDIATE_COLUMN, INTERMEDIATE_BOMBS), bombs: INTERMEDIATE_BOMBS};
    case Level.expert: return {board: generateBoard(EXPERT_ROW, EXPERT_COLUMN, EXPERT_BOMBS), bombs: EXPERT_BOMBS};
    case Level.beginner: 
    default: 
      return {board: generateBoard(BEGINNER_ROW, BEGINNER_COLUMN, BEGINNER_BOMBS), bombs: BEGINNER_BOMBS}
  }
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
      bombsAdded++;
    }
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

export const generateAdjacentCells = (row:number, col:number, board:CellType[][]):CellType[][] => {
  let copyBoard = [...board];
  const currentCell = board[row][col];

  if (!currentCell.isVisible) {
    copyBoard[row][col] = {
      ...currentCell,
      isVisible: true
    }
  }

  const topLeft = getAdjacentCell(row - 1, col - 1, board);
  const topMid = getAdjacentCell(row - 1, col, board);
  const topRight = getAdjacentCell(row - 1, col + 1, board);
  const midLeft = getAdjacentCell(row, col - 1, board);
  const midRight = getAdjacentCell(row, col + 1, board);
  const bottomLeft = getAdjacentCell(row + 1, col - 1, board);
  const bottomMid = getAdjacentCell(row + 1, col, board);
  const bottomRight = getAdjacentCell(row + 1, col + 1, board);

  if (topLeft) {
    if (!topLeft.isVisible && topLeft.bombs !== -1) {
      if (topLeft.bombs === 0) {
        copyBoard[row - 1][col - 1] = {
          ...topLeft,
          isFlag: false,
        }
        copyBoard = generateAdjacentCells(row - 1, col - 1, copyBoard);
      } else {
        copyBoard[row-1][col-1] = {
          ...topLeft,
          isVisible: true,
        }
      }
    }
  }

  if (topMid) {
    if (!topMid.isVisible && topMid.bombs !== -1) {
      if (topMid.bombs === 0) {
        copyBoard[row - 1][col] = {
          ...topMid,
          isFlag: false,
        }
        copyBoard = generateAdjacentCells(row - 1, col, copyBoard);
      } else {
        copyBoard[row-1][col] = {
          ...topMid,
          isVisible: true,
        }
      }
    }
  }

  if (topRight) {
    if (!topRight.isVisible && topRight.bombs !== -1) {
      if (topRight.bombs === 0) {
        copyBoard[row - 1][col + 1] = {
          ...topRight,
          isFlag: false,
        }
        copyBoard = generateAdjacentCells(row - 1, col + 1, copyBoard);
      } else {
        copyBoard[row - 1][col + 1] = {
          ...topRight,
          isVisible: true,
        }
      }
    }
  }

  if (midLeft) {
    if (!midLeft.isVisible && midLeft.bombs !== -1) {
      if (midLeft.bombs === 0) {
        copyBoard[row][col - 1] = {
          ...midLeft,
          isFlag: false,
        }
        copyBoard = generateAdjacentCells(row, col - 1, copyBoard);
      } else {
        copyBoard[row][col - 1] = {
          ...midLeft,
          isVisible: true,
        }
      }
    }
  }

  if (midRight) {
    if (!midRight.isVisible && midRight.bombs !== -1) {
      if (midRight.bombs === 0) {
        copyBoard[row][col + 1] = {
          ...midRight,
          isFlag: false,
        }
        copyBoard = generateAdjacentCells(row, col + 1, copyBoard);
      } else {
        copyBoard[row][col + 1] = {
          ...midRight,
          isVisible: true,
        }
      }
    }
  }

  if (bottomLeft) {
    if (!bottomLeft.isVisible && bottomLeft.bombs !== -1) {
      if (bottomLeft.bombs === 0) {
        copyBoard[row + 1][col - 1] = {
          ...bottomLeft,
          isFlag: false,
        }
        copyBoard = generateAdjacentCells(row + 1, col - 1, copyBoard);
      } else {
        copyBoard[row + 1][col - 1] = {
          ...bottomLeft,
          isVisible: true,
        }
      }
    }
  }

  if (bottomMid) {
    if (!bottomMid.isVisible && bottomMid.bombs !== -1) {
      if (bottomMid.bombs === 0) {
        copyBoard[row + 1][col] = {
          ...bottomMid,
          isFlag: false,
        }
        copyBoard = generateAdjacentCells(row + 1, col, copyBoard);
      } else {
        copyBoard[row + 1][col] = {
          ...bottomMid,
          isVisible: true,
        }
      }
    }
  }

  if (bottomRight) {
    if (!bottomRight.isVisible && bottomRight.bombs !== -1) {
      if (bottomRight.bombs === 0) {
        copyBoard[row + 1][col + 1] = {
          ...bottomRight,
          isFlag: false,
        }
        copyBoard = generateAdjacentCells(row + 1, col + 1, copyBoard);
      } else {
        copyBoard[row + 1][col + 1] = {
          ...bottomRight,
          isVisible: true,
        }
      }
    }
  }

  return copyBoard;
}

export const showGameOverBoard = (board:CellType[][]):CellType[][] => {
  let copyBoard = [...board];
  board.map((row:CellType[], rowIndex:number) => {
    return row.map((col:CellType, colIndex:number) => {
      const currentCell = board[rowIndex][colIndex];
      if (currentCell.bombs === -1) {
        return copyBoard[rowIndex][colIndex] = {
          ...currentCell, 
          isVisible: currentCell.isFlag ? false : true,
          isDisable: true,
        }
      }
      if (currentCell.bombs !== -1 && currentCell.isFlag) {
        return copyBoard[rowIndex][colIndex] = {
          ...currentCell, 
          isFlagWrong: true,
          isDisable: true,
        }
      }
      if (currentCell.bombs !== -1 && !currentCell.isVisible) {
        return copyBoard[rowIndex][colIndex] = {
          ...currentCell, 
          isDisable: true,
        }
      }
      return col;
    })
  })

  return copyBoard;
}

export const showAllFlags = (board:CellType[][]):CellType[][] => {
  let copyBoard = [...board];
  board.map((row:CellType[], rowIndex:number) => {
    return row.map((col:CellType, colIndex:number) => {
      const currentCell = board[rowIndex][colIndex];
      if (currentCell.bombs === -1) {
        copyBoard[rowIndex][colIndex] = {
          ...currentCell,
          isFlag: true,
          isDisable: true,
        }
      }
      return col;
    })
  })
  console.log(copyBoard)
  return copyBoard;
}

export const isSafeCellExisting = (board:CellType[][]):boolean => {
  let isExisting = false;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      const currentCell = board[i][j];
      if (!currentCell.isVisible && currentCell.bombs !== -1) {
        isExisting = true;
        break;
      }
    }
  }
  return isExisting;
}
