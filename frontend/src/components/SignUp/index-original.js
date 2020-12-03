import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { signup, SYNC_EMAIL, SYNC_PASSWORD, SYNC_PSEUDO, SYNC_PASSWORDVAL } from 'src/store/actions';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import withRoot from '../modules/withRoot';
import Button from '../modules/components/Button';
import Footer from '../modules/views/Footer';
import HeaderHome from '../modules/views/HeaderHome';
// 1 - l'api YUP utilise ces objets pour la validation des données

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  //* the rest of the code is to see the password
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const email = useSelector((state) => state.email);
  const password = useSelector((state) => state.password);
  const pseudo = useSelector((state) => state.pseudo);
  const passwordVal = useSelector((state) => state.passwordVal);
  const classes = useStyles();
  // const [values, setValues] = React.useState({    
  //   password: '',
  // });

  
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
          <Typography component="h1" variant="h3">
            Je crée mon compte
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(evt) => {
              evt.preventDefault();
              dispatch(signup(history));
            }}
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
                  label="Pseudo"
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

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="passwordVal"
                  label="Mot de passe de validation"
                  type="password"
                  id="passwordVal"
                  autoComplete="current-password"
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
              Je valide et j'active mon compte avec le mail reçu.
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

export default withRoot(SignUp);
