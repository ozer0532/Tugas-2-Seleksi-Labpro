import React from 'react';

import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import FriendInfoCard from './friendInfoCard';
import PersonInfo from './personInfo';

// TODO: Select person when panel is clicked

const styles = {
  mainContainer: {
    margin: '15px',
  },
  spaced: {
    marginTop: '15px',
  },
}

class DataDisplayer extends React.Component {

  constructor(props) {
    super(props);

    this.RenderFriends = this.RenderFriends.bind(this);
    this.SearchText = this.SearchText.bind(this);
  }

  RenderFriends () {
    if (this.props.data.name === '-' || this.props.searching || this.props.fail) {
      return '';
    } else if ('friends' in this.props.data && this.props.data.friends.length > 0) {
      return (
        <Box style = { styles.spaced } >
          <Typography variant='h6'> 
            Rekan: 
          </Typography>

          { this.props.data.friends.map((entry, index) => {
            return (
              <FriendInfoCard
                onSearch = { this.props.onSearch } 
                entry = { entry } 
                index = { index } 
              />
            );
          })}
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
    return (
      <React.Fragment>
        <Typography
          variant = 'subtitle1'
          color = 'textSecondary'
        >
          Hasil Pencarian:
        </Typography>
        {   this.props.searching
          ? <Typography variant='h5'> Mencari... </Typography>
          : this.props.fail
          ? <Typography variant='h5'> Orang tidak ditemukan </Typography>
          : this.props.data.name === '-'
          ? <Typography variant='h5'> - </Typography>
          :<PersonInfo
              headerVariant = 'h5'
              infoVariant = 'body1'
              data = { this.props.data }
            />
        }
      </React.Fragment>
    );
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