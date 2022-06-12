import React from 'react';
import './App.css';
import { Heading, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBomb } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <div className='App'>
      <Heading as='h2' size='xl' display='flex' flexDirection='row'>
        <FontAwesomeIcon icon={faBomb} fontSize='45px' />
        <Text marginLeft='20px' marginRight='20px'>MINESWEEPER</Text>
        <FontAwesomeIcon icon={faBomb} fontSize='45px' />
      </Heading>
    </div>
  );
}

export default App;
