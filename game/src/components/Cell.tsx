import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { faBomb, faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { generateNumColor } from '../utils';
import { BOMB_SELECTED_COLOR } from '../utils/constant';

interface ICellProps {
  row: number;
  col: number;
  bombs: number;
  isFlag?: boolean;
  isVisible?: boolean;
  isBombClicked?: boolean;
  isFlagWrong?:boolean;
  isDisable?:boolean
  onClick(rowIndex: number, colIndex: number): (e: React.MouseEvent) => void;
  onFlagClick(
    rowIndex: number,
    colIndex: number
  ): (e: React.MouseEvent) => void;
}

const Cell = ({
  row,
  col,
  bombs,
  isFlag,
  isVisible,
  isBombClicked,
  isFlagWrong,
  isDisable,
  onClick,
  onFlagClick,
}: ICellProps) => {
  const renderVisibleContent = () => {
    if (isVisible) {
      if (bombs === -1) {
        return <FontAwesomeIcon icon={faBomb} />;
      }
      if (bombs !== 0) {
        return (
          <Text color={generateNumColor(bombs)} fontWeight='bold'>
            {bombs}
          </Text>
        );
      }
    }
    if (isFlag) {
      return <FontAwesomeIcon icon={faFlag} color='#e06666' />;
    }
    return <></>;
  };

  return (
    <Box
      className={`${
        isVisible ? 'bomb-num-container box-shadow center' : 'cell box-shadow'
      }`}
      onClick={onClick(row, col)}
      onContextMenu={onFlagClick(row, col)}
      backgroundColor={isBombClicked ? BOMB_SELECTED_COLOR : '#aca9a9'}
    >
      {renderVisibleContent()}
    </Box>
  );
};

export default Cell;
