import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { faBomb, faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { generateNumColor } from '../utils';
import {
  BOMB_SELECTED_COLOR,
  FLAG_ON_NUM_COLOR,
  VISIBLE_BG,
} from '../utils/constant';

interface ICellProps {
  row: number;
  col: number;
  bombs: number;
  isFlag?: boolean;
  isVisible?: boolean;
  isBombClicked?: boolean;
  isDisable?: boolean;
  isFlagWrong?: boolean;
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
  isDisable,
  isFlagWrong,
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

  const renderClassName = (): string => {
    if (isVisible) {
      return 'bomb-num-container box-shadow center';
    }
    if (isDisable) {
      return 'cell box-shadow cell-win-over';
    } else {
      return 'cell box-shadow';
    }
  };

  const gameOverBg = (): string => {
    if (isFlagWrong) {
      return FLAG_ON_NUM_COLOR;
    } else if (isBombClicked) {
      return BOMB_SELECTED_COLOR;
    } else {
      return VISIBLE_BG;
    }
  };

  return (
    <Box
      className={renderClassName()}
      onClick={onClick(row, col)}
      onContextMenu={onFlagClick(row, col)}
      backgroundColor={gameOverBg()}
    >
      {renderVisibleContent()}
    </Box>
  );
};

export default Cell;
