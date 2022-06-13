import React, { useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBomb, faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { generateBoard } from '../utils';
import {
  INTERMEDIATE_ROW,
  INTERMEDIATE_COLUMN,
  INTERMEDIATE_BOMBS,
} from '../utils/constant';
import Cell from './Cell';
import Num from './Num';

function Game() {
  const [board, setBoard] = useState(
    generateBoard(INTERMEDIATE_ROW, INTERMEDIATE_COLUMN, INTERMEDIATE_BOMBS)
  );

  console.log(board)

  const renderBoard = (): React.ReactNode => {
    return board.map((row, rowIndex) => {
      return (
        <Box key={rowIndex} display='flex' flexDirection='row' marginTop='1px'>
          {row.map((column, columnIndex) => {
            return (
              <Box key={column.key} marginLeft='1px'>
                <Cell row={rowIndex} col={columnIndex} bombs={column.bombs} isFlag={column.isFlag} isVisible={column.isVisible} />
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
        <FontAwesomeIcon icon={faBomb} fontSize='45px' />
        <Text marginLeft='20px' marginRight='20px'>
          MINESWEEPER
        </Text>
        <FontAwesomeIcon icon={faBomb} fontSize='45px' />
      </Heading>

      <Box display='flex' flexDirection='column' marginTop='10px'>
        <Box display='flex' justifyContent='space-between' flexDirection='row'>
          <Num num={0} />
          <Box
            width='35px'
            height='35px'
            backgroundColor='lightgray'
            justifyContent='center'
            alignItems='center'
            display='flex'
            className='box-shadow click'
          >
            <FontAwesomeIcon icon={faFaceSmile} fontSize='25px' />
          </Box>
          <Num num={0} />
        </Box>

        <Box>{renderBoard()}</Box>
      </Box>
    </div>
  );
}

export default Game;
