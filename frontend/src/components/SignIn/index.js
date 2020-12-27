import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { login, SYNC_EMAIL, SYNC_PASSWORD} from 'src/store/actions';

import Avatar from '@material-ui/core/Avatar';

import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';
import withRoot from '../modules/withRoot';
import Button from '../modules/components/Button';
import Footer from '../modules/views/Footer';
import HeaderHome from '../modules/views/HeaderHome';
// to the style !
import useStyles from './styles/styles';

// 1 - l'api YUP utilise ces objets pour la validation des données


const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const email = useSelector((state) => state.email);
  const password = useSelector((state) => state.password);
  const pseudo = useSelector(state => state.pseudo);
  
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <HeaderHome />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Page de connexion
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(evt) => {
              evt.preventDefault();
              dispatch(login(history));
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  type="email"
                  helperText="Requis"
                  value={email}
                  onChange={(evt) => {
                    const newEmail = evt.target.value;
                    dispatch({ type: SYNC_EMAIL, email: newEmail });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  helperText="Requis - Minimum 1 minuscule, 1 majuscule, 1 chiffre, un des caractères #?!@$%^&*-"
                  value={password}
                  onChange={(evt) => {
                    const newPassword = evt.target.value;
                    dispatch({ type: SYNC_PASSWORD, password: newPassword });
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Connexion
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/resetpassword" variant="body2">
                  Mot de passe perdu ?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  Pas de compte, créez-en un ici
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default withRoot(SignIn);
