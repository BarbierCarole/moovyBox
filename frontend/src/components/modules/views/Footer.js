import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import Link from '@material-ui/core/Link';
import {BrowserRouter as Router, Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundImage: "radial-gradient( circle farthest-corner at 20.8% 13%,  rgba(40,88,210,1) 0%, rgba(2,29,98,1) 90% )",
    color: theme.text.secondary.main,
    alignItems: 'center',
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm" align="center">
        <Link to="/contact" color="inherit">
          Nous contacter
        </Link>
        <br />
        <Link to="/disclaimer" color="inherit">
          Mentions légales | Cookies
        </Link>
      </Container>
    </footer>
  );
}
