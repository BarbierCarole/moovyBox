import React from 'react';
import img1 from './404.png';
import { makeStyles } from '@material-ui/core/styles';

import Header from '../modules/views/Header';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      width: "100%"
    },
}));

const NotFound = () => {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <Header />
            <img src={img1} alt="404" />
        </div>
    )
}

export default NotFound;