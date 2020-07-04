import React from 'react';

import Typography from '@material-ui/core/Typography';

function PersonInfo (props) {
  return (
    <React.Fragment>
      <Typography variant = { props.headerVariant }>
        { props.data.name }
      </Typography>
      <Typography variant = { props.infoVariant }>
        { 'Id: ' + props.data.id + ' ' }
        Elemen: <i>{ props.data.element }</i>
      </Typography>
    </React.Fragment>
  );
}

export default PersonInfo;