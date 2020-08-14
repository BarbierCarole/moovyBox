import React from 'react';
import {BrowserRouter as Router, Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import boxy from './images/boxy-ready-detoure.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  title: {
    fontSize: 24,
  },
  toolbar: {
    minHeight: 128,
    justifyContent: 'center',
  },
  media: {
    height: 0,
    width: 50,
    paddingTop: '56.25%', // 16:9
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function HeaderHome() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar className={classes.toolbar}>
        <Link to="/move">
          <div className={classes.center}>
            <CardMedia
              className={classes.media}
              image={boxy}
              title="Boxy"
            />
            <Typography variant="h6" className={classes.title}>
              MoovyBox
            </Typography>
          </div>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
