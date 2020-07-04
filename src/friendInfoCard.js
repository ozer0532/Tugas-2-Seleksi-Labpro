import React from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import PersonInfo from './personInfo';

const styles = {
  card: {
    padding: '10px',
    marginTop: '10px',
    marginBottom: '10px',
  },
}

function FriendInfoCard (props) {
    return (
        <Card style = { styles.card }>
            <Typography 
            variant = "subtitle2"
            color="textSecondary"
            >
            { (props.index + 1) + '.' }
            </Typography>
            <PersonInfo
            headerVariant = "h6"
            infoVariant = "body1"
            data = { props.entry }
            />
        </Card>
    );
}

export default FriendInfoCard;