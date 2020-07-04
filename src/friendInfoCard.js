import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

import PersonInfo from './personInfo';

const styles = {
  card: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  actionArea: {
    padding: '10px',
  }
}

function FriendInfoCard (props) {
  return (
    <Card style = { styles.card }>
      <CardActionArea 
        style = { styles.actionArea } 
        onClick = { () => props.onSearch(props.entry.id) }
      >
        <Typography 
          variant = 'subtitle2'
          color='textSecondary'
        >
          { (props.index + 1) + '.' }
        </Typography>
        <PersonInfo
          headerVariant = 'h6'
          infoVariant = 'body1'
          data = { props.entry }
        />
      </CardActionArea>
    </Card>
  );
}

export default FriendInfoCard;