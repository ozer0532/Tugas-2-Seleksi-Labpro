import React from 'react';

import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'

import SearchIcon from '@material-ui/icons/Search'

const styles = {
  paper: {
    display: "flex",
    padding: '2px 4px',
    margin: '10px',
  },
  field: {
    flex: 1,
    marginLeft: "2px",
    marginRight: "10px",
  },
  icon: {
    padding: "10px",
  },
};

class SearchInput extends React.Component {

  render() {
    return (
      <Paper style = { styles.paper } >
        <IconButton style = { styles.icon } >
          <SearchIcon/>
        </IconButton>
        <InputBase
          style = { styles.field }
          placeholder="Pencarian"
        />
      </Paper>
    );
  }
}

export default SearchInput;