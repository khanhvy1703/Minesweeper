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
}

const Cell = ({ row, col, bombs, isFlag, isVisible }: ICellProps) => {
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
    >
      {renderVisibleContent()}
    </Box>
  );
};

export default Cell;
