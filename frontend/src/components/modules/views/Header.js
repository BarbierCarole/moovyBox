import React from 'react';
import {BrowserRouter as Router, Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withRouter } from 'react-router-dom';
import GoBack from '../components/GoBack';
import MenuIcon from '@material-ui/icons/Menu';
import useStyles from './styles/stylesHeader';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <AppBar position="static" style={{background:'radial-gradient( circle 872px at 3.4% -23.5%,  rgba(42,250,223,1) 0%, rgba(37,88,210,1) 44.5%, rgba(29,58,126,1) 97.8% )'}} > ---> cyan and blue*/}
      <AppBar position="static" style={{background:'radial-gradient(759px at 18.3% -23.5%, rgb(255, 98, 191) 0%, rgb(40, 88, 210) 69.1%)'}} >  
        <Toolbar className={classes.toolbar}>
          <div className={classes.left}>
            <GoBack />
          </div>
          <Link to="/move">
          <Typography variant="h6" className={classes.title}>
            MoovyBox
          </Typography>
          </Link>
          <div className={classes.right}>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color="inherit"><MenuIcon style={{ fontSize: 40 }} /></Button>
            <Menu
              id="simple-menu"
              className = "menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link to="/profile">
                <MenuItem onClick={handleClose}>Profil</MenuItem>
              </Link>
              <Link to="/move">
                <MenuItem onClick={handleClose}>Mes déménagements</MenuItem>
              </Link>
              <Link to="/signin">
              <MenuItem className={classes.linkText} onClick={handleClose}>Déconnexion</MenuItem>
              </Link>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Header);
