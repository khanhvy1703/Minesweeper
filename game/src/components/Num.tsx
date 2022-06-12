import React from 'react';
import { Box } from '@chakra-ui/react';

interface INumProps {
  num: number;
}
const Num = ({num}:INumProps)=> {
  return (
    <Box height='45px' alignItems='center' fontSize='25px' paddingTop='2px'>
      {num}
    </Box>
  );
};

export default Num;
