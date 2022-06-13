import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { faBomb, faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { generateNumColor } from '../utils';

interface ICellProps {
  row: number;
  col: number;
  bombs: number;
  isFlag?: boolean;
  isVisible?: boolean;
  onClick(rowIndex:number, colIndex:number): (e:React.MouseEvent) => void;
  onFlagClick(rowIndex:number, colIndex:number): (e:React.MouseEvent) => void;
}

const Cell = ({ row, col, bombs, onClick, onFlagClick, isFlag, isVisible }: ICellProps) => {
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
    <div
      className={`${
        isVisible ? 'bomb-num-container box-shadow center' : 'cell box-shadow'
      }`}
      onClick={onClick(row, col)}
      onContextMenu={onFlagClick(row, col)}
    >
      {renderVisibleContent()}
    </div>
  );
};

export default Cell;
