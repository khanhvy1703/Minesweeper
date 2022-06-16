import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBomb,
  faClock
} from '@fortawesome/free-solid-svg-icons';

interface INumProps {
  num: number;
  isBomb?:boolean;
}
const Num = ({ num, isBomb }: INumProps) => {
  const renderContent = (): string => {
    if (num < 0 && num > -10) {
      return `-0${num * -1}`;
    }
    if (num <= -10 && num > -99) {
      return `${num}`;
    }
    if (num < -99) {
      return '-99';
    }
    if (num < 10) {
      return `00${num}`;
    }
    if (num >= 10 && num < 100) {
      return `0${num}`;
    }
    if (num >= 100 && num < 1000) {
      return `${num}`;
    }
    if (num >= 1000) {
      return '999';
    }
    return '';
  };

  const renderIcon = () => {
    if (isBomb) {
      return <FontAwesomeIcon icon={faBomb} fontSize='25px' />
    } else {
      return <FontAwesomeIcon icon={faClock} fontSize='25px' />
    }
  }

  return (
    <Box height='45' alignItems='center' fontSize='25px' paddingTop='2px' display='flex' flexDirection='row'>
      <Box>{renderIcon()}</Box>
      <Text marginLeft='5px'>{renderContent()}</Text>
    </Box>
  );
};

export default Num;
