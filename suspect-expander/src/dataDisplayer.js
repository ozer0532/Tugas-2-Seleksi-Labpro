import React from 'react';

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';

const styles = {
  mainContainer: {
    margin: '15px',
  },
}

class DataDisplayer extends React.Component {
  render () {
    return (
      <Box style = { styles.mainContainer }>
        <Typography variant='subtitle1'>
          Hasil Pencarian:
        </Typography>
        <Typography variant='h4'>
          Nama Orang Disini
        </Typography>
      </Box>
    );
  }
}

export default DataDisplayer;