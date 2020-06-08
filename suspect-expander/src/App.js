import React from 'react';
import logo from './logo.svg';
import './App.css';

import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'

import SearchInput from './searchInput'

const styles = {
  root : {
    display: "flex",
    justifyContent: 'center',
    background: 'white',
    minHeight: '100vh',
  }
};

function App() {

  return (
    <Box style = { styles.root }>
      <Container>

        <SearchInput />
      </Container>
    </Box>
  );
}

export default App;
