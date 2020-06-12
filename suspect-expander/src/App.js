import React from 'react';

import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import { GetData, GetAllPerson } from './getData'
import SearchInput from './searchInput'
import DataDisplayer from './dataDisplayer';
import GraphDisplayer from './graphDisplayer';

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    background: 'white',
    height: '100vh',
  },
  searchContainer: {
    background: '#2196f3'
  },
  mainContainer: {
    flex: '0 1 100%',
    overflowY: 'auto',
  },
  dataContainer: {
    background: '#fafafa',
    overflowY: 'auto',
    maxHeight: '100%',
  },
  graphContainer: {
    background: '#fff',
    height: '100%',
  },
  displayerContainer: {
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personList: [],
      currentPerson: {
        id: "0",
        name: "-",
        friends: [],
      },
      searching: false,
    };
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
    this.setState({ searching: true });
    let checkExist = setInterval(async () => {
      if (this.state.personList.length > 0) {
        console.log("Exists!");
        clearInterval(checkExist);
         
        // Get person
        let foundList = this.state.personList.filter(e => e.name === text);
        if (foundList.length > 0) {
          let collectedData = await GetData(foundList[0].id);
          console.log(collectedData);
          this.setState({ searching: false });
          this.setState({
            currentPerson: collectedData.payload,
          });
        } else {
          console.log("Not Found: " + text);
        }
      }
    }, 100);
  }

  render() {
    return (
      <Box style = { styles.root }>
        <Box style = { styles.searchContainer }>
          <Container>
            <SearchInput 
              onSearch = { this.onSearch } 
              onEnterPressed = { this.onSearch }
            />
          </Container>
        </Box>
        <Grid container spacing={0} style = { styles.mainContainer }>
          <Grid item xs={12} md={4} lg={3} style = {styles.dataContainer}>
            <DataDisplayer 
              data = { this.state.currentPerson } 
              searching = { this.state.searching } 
            />
          </Grid>
          <Grid item xs={12} md={8} lg={9} style = { styles.graphContainer }>
            <GraphDisplayer />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default App;
