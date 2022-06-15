export enum Level {
  beginner, 
  intermediate,
  expert,
}

export type BoardType =  {
  board: CellType[][],
  bombs: number,
}

/**
 * -1: bombs,
 * 0 - 8: num of bombs around
 */
export type CellType = {
  key:number,
  bombs: number, 
  isDisable?:boolean,
  isFlag?: boolean,
  isVisible?: boolean,
  isBombClicked?:boolean,
  isFlagWrong?:boolean,
}

export enum Face {
  none,
  start, 
  lose,
  win,
  suprise,
}