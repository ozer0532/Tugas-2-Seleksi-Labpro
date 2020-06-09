import React from 'react';

import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'

import { GetData, GetAllPerson } from './getData'
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
      personList: [],
    };
    console.log(this.state);
    this.GetPersonList = this.GetPersonList.bind(this);
    this.onSearch = this.onSearch.bind(this);

    this.GetPersonList();
  }

  async GetPersonList() {
    const list = await GetAllPerson();
    this.state.personList = list;
    console.log(this.state);
  }

  async onSearch(text) {
    // Wait until all found https://stackoverflow.com/questions/16149431/make-function-wait-until-element-exists
    var checkExist = setInterval(async () => {
      if (this.state.personList.length > 0) {
        console.log("Exists!");
        clearInterval(checkExist);
         
        // Get person
        var foundList = this.state.personList.filter(e => e.name === text);
        if (foundList.length > 0) {
          console.log(await GetData(foundList[0].id));
        } else {
          console.log("Not Found: " + text);
        }
      }
    }, 100);
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
