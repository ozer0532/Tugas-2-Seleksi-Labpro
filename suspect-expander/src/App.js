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
      fail: false,
      graphData: {
        nodes: [
          { id: "0", name: "-", x: -100, y: -100 }  // Dummy data so graph renderer wouldn't crash
        ],
        links: [],
      }
    };
    this.GetPersonList = this.GetPersonList.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.updateGraphData = this.updateGraphData.bind(this);
  }

  async GetPersonList() {
    const list = await GetAllPerson();
    this.state.personList = list;
    console.log(this.state);
  }

  async onSearch(text) {
    // Reject if search is ongoing
    if (this.state.searching) {
      return;
    }
    this.setState({ searching: true });

    text = text.trim();
    let parsedId = parseInt(text);
    // Try parse as id first
    if (!isNaN(parsedId)) {
      let collectedData = await GetData(text);
      // Check if data valid
      if (collectedData.status === 200) {
        this.setState({ 
          searching: false,
          currentPerson: collectedData.payload,
          fail: false,
        });
        
        this.updateGraphData()
        return;
      }
    }

    // Get person list if it does not exist yet
    if (this.state.personList.length === 0) {
      this.GetPersonList();
    }

    // Wait until all found https://stackoverflow.com/questions/16149431/make-function-wait-until-element-exists
    let checkExist = setInterval(async () => {
      if (this.state.personList.length > 0) {
        clearInterval(checkExist);
         
        // Get person
        let foundList = this.state.personList.filter(e => e.name === text);
        if (foundList.length > 0) {
          let collectedData = await GetData(foundList[0].id);
          console.log(collectedData);

          // Update data
          this.setState({ 
            searching: false,
            currentPerson: collectedData.payload,
            fail: false,
          });
          this.updateGraphData()
        } else {
          this.setState({ 
            searching: false,
            fail: true,
          });
        }
      }
    }, 100);
  }

  updateGraphData() {
    let graphData = this.state.graphData;
    // Check if current person not already exist in graph
    if (graphData.nodes.find( item => { return item.id === this.state.currentPerson.id } ) === undefined) {

      // Insert current person node
      graphData.nodes.push({
        id: this.state.currentPerson.id,
        name: this.state.currentPerson.name,
      })
    }

    // Check for all friends if not already exist
    this.state.currentPerson.friends.forEach((friend, index) => {
      if (graphData.nodes.find( item => { return item.id === friend.id } ) === undefined) {

        // Insert friend node
        graphData.nodes.push({
          id: friend.id,
          name: friend.name,
        });
      }

      // Insert link if not already exist
      let linkData = {
        source: this.state.currentPerson.id,
        target: friend.id,
      };
      if (graphData.links.find( item => { return (item.source === linkData.source) && (item.target === linkData.target) } ) === undefined) {
        graphData.links.push(linkData);
      }
    })

    this.setState({ graphData: graphData });
    console.log(this.state);
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
              fail = { this.state.fail }
            />
          </Grid>
          <Grid item xs={12} md={8} lg={9} style = { styles.graphContainer }>
            <GraphDisplayer 
              data = { this.state.graphData } 
              onClick = { this.onSearch }
            />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default App;
