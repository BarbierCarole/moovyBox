import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const GoBack = ({ history }) => {
    return (<IconButton disabled={history.location.pathname === '/move'} onClick={() => history.goBack()} edge="start"  color="inherit" aria-label="menu">
      <ArrowBackIosRoundedIcon />
    </IconButton>)
{/* <img src="./images/back.png" onClick={() => history.goBack()} alt="Go back" />; */}
}

export default withRouter(GoBack);
