import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFaceSmile,
  faFaceDizzy,
  faFaceSurprise,
  faFaceGrinSquint,
} from '@fortawesome/free-solid-svg-icons';
import {
  generateAdjacentCells,
  generateBoardByLevel,
  isSafeCellExisting,
  showAllFlags,
  showGameOverBoard,
} from '../utils';
import Cell from './Cell';
import Num from './Num';
import { BoardType, CellType, Face, Level } from '../utils/types';

interface IGameProps {
  level: Level;
}

const Game = ({ level }: IGameProps) => {
  const boardRef = useRef(null);
  const generateBoard: BoardType = generateBoardByLevel(level);
  const [board, setBoard] = useState<CellType[][]>(generateBoard.board);
  const [faces, setFaces] = useState<Face>(Face.start);
  const [numBombs, setNumBombs] = useState<number>(generateBoard.bombs);
  const [timer, setTimer] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [win, setWin] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseUp = () => {
      setFaces(Face.start);
    };

    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [faces]);

  useEffect(() => {
    if (start) {
      const time = setInterval(() => {
        setTimer(timer + 1);
      }, 1000);

      return () => {
        clearInterval(time);
      };
    }
  }, [start, timer]);

  useEffect(() => {
    if (gameOver) {
      setFaces(Face.lose);
      setStart(false);
      setBoard(showGameOverBoard(board));
    }
  }, [gameOver, board, faces, start]);

  useEffect(() => {
    if (win) {
      setFaces(Face.win);
      setStart(false);
      setBoard(showAllFlags(board));
    }
  }, [board, win, faces, start]);

  const handleCellClick = (row: number, col: number) => (): void => {
    if (!start) {
      setStart(true);
    }

    const currentCell = board[row][col];
    let copyBoard = [...board];

    if (currentCell.isFlag || currentCell.isVisible) {
      return;
    }
    if (currentCell.bombs === -1) {
      copyBoard[row][col] = {
        ...currentCell,
        isVisible: true,
        isBombClicked: true,
      };
      setGameOver(true);
      return;
    } else if (currentCell.bombs === 0) {
      copyBoard = generateAdjacentCells(row, col, board);
    } else {
      copyBoard[row][col] = {
        ...currentCell,
        isVisible: true,
      };
    }

    // check if win
    if (!isSafeCellExisting(board)) {
      setWin(true);
      return;
    }

    setBoard(copyBoard);
  };

  const handleCellFlagClick =
    (row: number, col: number) =>
    (e: React.MouseEvent): void => {
      e.preventDefault();
      let copyBoard = [...board];
      const currentCell = board[row][col];

      if (!currentCell.isVisible) {
        if (!currentCell.isFlag) {
          copyBoard[row][col] = {
            ...currentCell,
            isFlag: true,
          };
          setNumBombs(numBombs - 1);
        } else {
          copyBoard[row][col] = {
            ...currentCell,
            isFlag: false,
          };
          setNumBombs(numBombs + 1);
        }
      }
      setBoard(copyBoard);
    };

  const handleFaceClick = (): void => {
    setStart(false);
    setTimer(0);
    setBoard(generateBoard.board);
    setNumBombs(generateBoard.bombs);
    setFaces(Face.start);
    setGameOver(false);
    setWin(false);
  };

  const renderFaces = () => {
    switch (faces) {
      case Face.suprise:
        return <FontAwesomeIcon icon={faFaceSurprise} fontSize='25px' />;
      case Face.lose:
        return <FontAwesomeIcon icon={faFaceDizzy} fontSize='25px' />;
      case Face.win:
        return <FontAwesomeIcon icon={faFaceGrinSquint} fontSize='25px' />;
      case Face.start:
      default:
        return <FontAwesomeIcon icon={faFaceSmile} fontSize='25px' />;
    }
  };

  const renderBoard = (): React.ReactNode => {
    return board.map((row, rowIndex) => {
      return (
        <Box key={rowIndex} display='flex' flexDirection='row' marginTop='1px'>
          {row.map((column, columnIndex) => {
            return (
              <Box key={column.key} marginLeft='1px'>
                <Cell
                  row={rowIndex}
                  col={columnIndex}
                  bombs={column.bombs}
                  isFlag={column.isFlag}
                  isVisible={column.isVisible}
                  isBombClicked={column.isBombClicked}
                  isDisable={column.isDisable}
                  isFlagWrong={column.isFlagWrong}
                  onClick={handleCellClick}
                  onFlagClick={handleCellFlagClick}
                />
              </Box>
            );
          })}
        </Box>
      );
    });
  };

  return (
    <Box display='flex' flexDirection='column' marginTop='10px'>
      <Box display='flex' justifyContent='space-between' flexDirection='row'>
        <Num num={numBombs} />
        <Box
          width='35px'
          height='35px'
          backgroundColor='lightgray'
          justifyContent='center'
          alignItems='center'
          display='flex'
          className='box-shadow click'
          onClick={handleFaceClick}
        >
          {renderFaces()}
        </Box>
        <Num num={timer} />
      </Box>

      <Box ref={boardRef}>{renderBoard()}</Box>
    </Box>
  );
};

export default Game;
