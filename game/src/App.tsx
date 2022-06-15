import React from 'react';
import { Heading, Text } from '@chakra-ui/react';
import './App.css';
import Game from './components/Game';
import { Level } from './utils/types';

function App() {
  return (
    <div className='App'>
      <Heading as='h2' size='xl' display='flex' flexDirection='row'>
        <Text marginLeft='20px' marginRight='20px'>
          MINESWEEPER
        </Text>
      </Heading>

      <Game level={Level.expert} />
    </div>
  );
}

export default App;
