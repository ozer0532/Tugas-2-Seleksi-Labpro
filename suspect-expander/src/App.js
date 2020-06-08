import React from 'react';
// import logo from './logo.svg';
// import './App.css';

import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'

import GetData from './getData'
import SearchInput from './searchInput'

const styles = {
  root : {
    display: "flex",
    justifyContent: 'center',
    background: 'white',
    minHeight: '100vh',
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  async onSearch(text) {
    console.log(await GetData(parseInt(text)));
  }

  render() {
    return (
      <Box style = { styles.root }>
        <Container>
          <SearchInput onSearch = { this.onSearch } />
        </Container>
      </Box>
    );
  }
}

export default App;
