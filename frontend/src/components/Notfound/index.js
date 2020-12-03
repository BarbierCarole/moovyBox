import React from 'react';
import img1 from './404.png';
import Header from '../modules/views/Header';
// to the style !
import useStyles from './styles/styles';

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