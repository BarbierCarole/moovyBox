import React from 'react';
import {BrowserRouter as Router, Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { withRouter } from 'react-router-dom';
import GoBack from '../components/GoBack'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  menuButton: {
    marginRight: theme.spacing(3),

  },
  title: {
    fontSize: 24,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  menu: {
    paddingTop: "26px",
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  }
}));

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
      <AppBar position="static" color="secondary">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left}>
            <GoBack />
            {/* <IconButton edge="start" onClick={() => console.log(history)} className={classes.menuButton} color="inherit" aria-label="menu">
              <ArrowBackIosRoundedIcon />
            </IconButton> */}
          </div>
          <Link to="/move">
          <Typography variant="h6" className={classes.title}>
            MoovyBox
          </Typography>
          </Link>
          <div className={classes.right}>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} color="inherit"><AccountCircleIcon style={{ fontSize: 40 }} /></Button>
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
