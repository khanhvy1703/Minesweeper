export enum Level {
  beginnner, 
  intermediate,
  expert,
}

/**
 * -1: bombs,
 * 0 - 8: num of bombs around
 */
export type CellType = {
  key:number,
  bombs: number, 
  isFlag?: boolean,
  isVisible?: boolean,
}

export enum Face {
  none,
  smile, 
  sad,
  suprise,
}