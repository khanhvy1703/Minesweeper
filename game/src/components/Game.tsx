import React, { useEffect, useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBomb,
  faFaceSmile,
  faFaceSadCry,
  faFaceSurprise,
} from '@fortawesome/free-solid-svg-icons';
import { generateAdjacentCells, generateBoard } from '../utils';
import {
  INTERMEDIATE_ROW,
  INTERMEDIATE_COLUMN,
  INTERMEDIATE_BOMBS,
} from '../utils/constant';
import Cell from './Cell';
import Num from './Num';
import { CellType, Face } from '../utils/types';

function Game() {
  const [board, setBoard] = useState<CellType[][]>(
    generateBoard(INTERMEDIATE_ROW, INTERMEDIATE_COLUMN, INTERMEDIATE_BOMBS)
  );
  const [faces, setFaces] = useState<Face>(Face.smile);
  const [numBombs, setNumBombs] = useState<number>(INTERMEDIATE_BOMBS);
  const [timer, setTimer] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseDown = () => {
      setFaces(Face.sad);
    };

    const handleMouseUp = () => {
      setFaces(Face.smile);
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

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
      };
    } else if (currentCell.bombs === 0) {
      copyBoard = generateAdjacentCells(row, col, board);
    } else {
      copyBoard[row][col] = {
        ...currentCell,
        isVisible: true,
      };
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
        } else {
          copyBoard[row][col] = {
            ...currentCell,
            isFlag: false,
          };
        }
      }
      setBoard(copyBoard);
    };

  const handleFaceClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    if (start) {
      setStart(false);
      setTimer(0);
      setBoard(
        generateBoard(INTERMEDIATE_ROW, INTERMEDIATE_COLUMN, INTERMEDIATE_BOMBS)
      );
      setNumBombs(INTERMEDIATE_BOMBS);
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
    <div className='App'>
      <Heading as='h2' size='xl' display='flex' flexDirection='row'>
        <Text marginLeft='20px' marginRight='20px'>
          MINESWEEPER
        </Text>
      </Heading>

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
            {faces === Face.smile ? (
              <FontAwesomeIcon icon={faFaceSmile} fontSize='25px' />
            ) : Face.sad ? (
              <FontAwesomeIcon icon={faFaceSadCry} fontSize='25px' />
            ) : (
              <FontAwesomeIcon icon={faFaceSurprise} fontSize='25px' />
            )}
          </Box>
          <Num num={timer} />
        </Box>

        <Box>{renderBoard()}</Box>
      </Box>
    </div>
  );
}

export default Game;
