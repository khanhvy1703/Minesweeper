import { Heading, Text } from '@chakra-ui/react';
import './App.css';
import Game from './components/Game';

function App() {
  return (
    <div className='App'>
      <Heading as='h2' size='xl' display='flex' flexDirection='row'>
        <Text marginLeft='20px' marginRight='20px'>
          MINESWEEPER
        </Text>
      </Heading>
      <Game />
    </div>
  );
}

export default App;
