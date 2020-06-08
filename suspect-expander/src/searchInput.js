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
    marginLeft: "10px",
  },
  icon: {
    padding: "10px",
  },
};

class SearchInput extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: "",
    }

    this.inputChange = this.inputChange.bind(this);
  }

  inputChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      // Main Container
      <Paper style = { styles.paper } >
        {/* Input Field */}
        <InputBase
          style = { styles.field }
          placeholder = "Pencarian"
          onChange = { this.inputChange }
        />

        {/* Search Button */}
        <IconButton
          // type = "submit"
          style = { styles.icon }
          onClick = { () => this.props.onSearch( this.state.value ) }
        >
          <SearchIcon/>
        </IconButton>
      </Paper>
    );
  }
}

export default SearchInput;