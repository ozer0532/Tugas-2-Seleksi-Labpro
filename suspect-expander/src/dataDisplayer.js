import React from 'react';

import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const styles = {
  mainContainer: {
    margin: '15px',
  },
  spaced: {
    marginTop: '15px',
  },
  card: {
    padding: '10px',
    marginTop: '10px',
    marginBottom: '10px',
  },
}

function FilterFriends (friendsList) {
  let filtered = friendsList

  // Filter duplicates https://stackoverflow.com/questions/2218999/remove-duplicates-from-an-array-of-objects-in-javascript
  filtered = filtered.filter((entry, index) => {
    let stringEntry = JSON.stringify(entry);
    return index === filtered.findIndex((item) => {
      return stringEntry === JSON.stringify(item)
    });
  })

  return filtered;
}

class DataDisplayer extends React.Component {

  constructor(props) {
    super(props);

    this.RenderIdElements = this.RenderIdElements.bind(this);
    this.RenderFriend = this.RenderFriend.bind(this);
    this.RenderFriends = this.RenderFriends.bind(this);
    this.SearchText = this.SearchText.bind(this);
  }

  RenderIdElements (props) {
    if (props.data == null || props.data.name === "-" || this.props.searching) {
      return "";
    } else {
      return (<React.Fragment> 
          { "Id: " + props.data.id + " " }
          Elemen: <i>{ props.data.element }</i>
        </React.Fragment>
      );
    }
  }

  RenderFriend (props) {
    return (
      <Card style = { styles.card }>
        <Typography 
          variant = "subtitle2"
          color="textSecondary"
        >
          { (props.index + 1) + '.' }
        </Typography>
        <Typography variant = 'h6'>
          { props.entry.name }
        </Typography>
        <this.RenderIdElements data = { props.entry } />
      </Card>
    );
  }

  RenderFriends () {
    if (this.props.data.name === "-" || this.props.searching || this.props.fail) {
      return "";
    } else if ("friends" in this.props.data && this.props.data.friends.length > 0) {
      return (
        <Box style = { styles.spaced } >
          <Typography variant='h6'> 
            Rekan: 
          </Typography>
          {
            FilterFriends(this.props.data.friends).map((entry, index) => {
              return (
                <Box key = { index }>
                  <this.RenderFriend 
                    entry = { entry } 
                    index = { index } 
                  />
                </Box>
              );
            })
          }
        </Box>
      );
    } else {
      return (
        <Box>
          <Typography> Rekan: Tidak ada </Typography>
        </Box>
      );
    }
  }

  SearchText () {
    if (this.props.searching) {
      return (
        <React.Fragment>
          <Typography 
            variant='subtitle1' 
            color="textSecondary" 
          >
            Hasil Pencarian:
          </Typography>
          <Typography variant='h5'>
            Mencari...
          </Typography>
          <Typography style = { styles.spaced }>
            {/* Nothing */}
          </Typography>
        </React.Fragment>
      )
    } else if (this.props.fail) {
      return (
        <React.Fragment>
          <Typography 
            variant='subtitle1' 
            color="textSecondary" 
          >
            Hasil Pencarian:
          </Typography>
          <Typography variant='h5'>
            Orang tidak ditemukan
          </Typography>
          <Typography style = { styles.spaced }>
            {/* Nothing */}
          </Typography>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Typography 
            variant='subtitle1' 
            color="textSecondary" 
          >
            Hasil Pencarian:
          </Typography>
          <Typography variant='h5'>
            { this.props.data.name }
          </Typography>
          <Typography style = { styles.spaced }>
            <this.RenderIdElements data = { this.props.data } />
          </Typography>
        </React.Fragment>
      );
    }
  }

  render () {
    return (
      <Box style = { styles.mainContainer }>
        {/* Top Row */}
        { this.SearchText() }

        <Divider style = { styles.spaced } />
        {/* Bottom Row (Friends) */}
        { this.RenderFriends() }
      </Box>
    );
  }
}

export default DataDisplayer;