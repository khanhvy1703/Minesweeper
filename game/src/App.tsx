import React, { useState } from 'react';
import { Box, Heading, Stack, Text } from '@chakra-ui/react';
import './App.css';
import Game from './components/Game';
import { Level } from './utils/types';

function App() {
  const [level, setLevel] = useState<number>(-1);

  const handleLevelClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setLevel(index);
  };

  const handleChangeLevel = (e: React.MouseEvent) => {
    e.preventDefault();
    setLevel(-1);
  };

  const renderGameLevel = () => {
    switch (level) {
      case 1:
        return Level.intermediate;
      case 2:
        return Level.expert;
      case 0:
      default:
        return Level.beginner;
    }
  };

  const renderContent = () => {
    if (level === -1) {
      return (
        <Box>
          <Stack direction={['column', 'row']} spacing='24px'>
            {['Beginner (8x8)', 'Intermediate (16x16)', 'Expert (30x16)'].map(
              (value: string, index: number) => {
                return (
                  <Box
                    key={index}
                    className='center level-click'
                    h='50px'
                    border='2px solid black'
                    borderRadius='10px'
                    padding='15px'
                    fontWeight='500'
                    onClick={(e) => handleLevelClick(index, e)}
                  >
                    {value}
                  </Box>
                );
              }
            )}
          </Stack>
        </Box>
      );
    } else {
      return (
        <Box className='center' flexDirection='column'>
          <Game level={renderGameLevel()} />
          <Box
            className='center level-click'
            width='200px'
            h='50px'
            border='2px solid black'
            borderRadius='10px'
            padding='15px'
            fontWeight='600'
            marginTop='30px'
            onClick={handleChangeLevel}
          >
            Choose level
          </Box>
        </Box>
      );
    }
  };

  return (
    <div className='App'>
      <Heading
        as='h2'
        size='xl'
        display='flex'
        flexDirection='row'
        marginBottom='30px'
      >
        <Text marginLeft='20px' marginRight='20px'>
          MINESWEEPER
        </Text>
      </Heading>
      {renderContent()}
    </div>
  );
}

export default App;
