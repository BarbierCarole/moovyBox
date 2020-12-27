import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { login, SYNC_EMAIL, SYNC_NEWPASSWORD, SYNC_PSEUDO, SYNC_PASSWORDVAL,SYNC_OLDPASSWORD } from 'src/store/actions';

import Avatar from '@material-ui/core/Avatar';

import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';
import withRoot from '../modules/withRoot';
import Button from '../modules/components/Button';
import Footer from '../modules/views/Footer';
import Header from '../modules/views/Header';
// to the style !
import useStyles from './styles/styles';
// 1 - l'api YUP utilise ces objets pour la validation des données

const Profile = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const dispatch = useDispatch();
  const history = useHistory();
  const email = useSelector((state) => state.email);
  const newPassword = useSelector((state) => state.newPassword);
  const pseudo = useSelector((state) => state.pseudo);
  const passwordVal = useSelector((state) => state.passwordVal);
  const oldPassword = useSelector((state) => state.oldPassword);
  const classes = useStyles();

  function handleSubmit(e) {
    e.preventDefault(); // stops default reloading behaviour
    axios
      .put(BASE_URL+`/api/profile/password`, { oldPassword, newPassword, passwordVal })
      .then(res => {
        if (res.status === 201) {
          dispatch(login(history));
          console.log('response.status',res.status);
        }
        else {
          console.error('erreur', res);
        };
        console.log('res : ',res);
        console.log('res.data : ',res.data);

      })
      .catch ((error) => {
        console.log("very big error");
        alert('Probleme de server');

      });
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            Mon compte
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="pseudo"
                  name="pseudo"
                  variant="outlined"
                  required
                  fullWidth
                  id="pseudo"
                  label={pseudo}
                  autoFocus
                  helperText="Pseudo requis"
                  value={pseudo}
                  onChange={(evt) => {
                    const newPseudo = evt.target.value;
                    dispatch({ type: SYNC_PSEUDO, pseudo : newPseudo });
                  }}
                />
              </Grid>
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
                  name="oldPassword"
                  autoComplete="current-password"
                  label="Ancien mot de passe"
                  //type="password"
                  id="oldPassword"
                  helperText="Requis - Minimum 1 minuscule, 1 majuscule, 1 chiffre, un des caractères #?!@$%^&*-"
                  value={oldPassword}
                  onChange={(evt) => {
                    const newOldPassword = evt.target.value;
                    dispatch({ type: SYNC_OLDPASSWORD, oldPassword: newOldPassword });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="newPassword"
                  label="Mot de passe"
                  //type="password"
                  id="newPassword"
                  helperText="Requis - Minimum 1 minuscule, 1 majuscule, 1 chiffre, un des caractères #?!@$%^&*-"
                  value={newPassword}
                  onChange={(evt) => {
                    const newNewPassword = evt.target.value;
                    dispatch({ type: SYNC_NEWPASSWORD, newPassword: newNewPassword });
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="passwordVal"
                  label="Mot de passe de validation"
                  //type="password"
                  id="passwordVal"
                  helperText="Requis - Minimum 1 minuscule, 1 majuscule, 1 chiffre, un des caractères #?!@$%^&*-"
                  value={passwordVal}
                  onChange={(evt) => {
                    const newPasswordVal = evt.target.value;
                    dispatch({ type: SYNC_PASSWORDVAL, passwordVal: newPasswordVal });
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
              Correction
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/resetpassword" variant="body2">
                  Mot de passe perdu ?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signin" variant="body2">
                  Déjà un compte ? Connectez-vous ici.
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

export default withRoot(Profile);
