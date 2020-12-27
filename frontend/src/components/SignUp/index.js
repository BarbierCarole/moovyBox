// index-originalWithFormk.js
import React from 'react';
import withRoot from '../modules/withRoot';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { signup, SYNC_EMAIL, SYNC_PASSWORD, SYNC_PSEUDO, SYNC_PASSWORDVAL } from 'src/store/actions';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
// to the style !
import useStyles from './styles/styles';
import Container from '@material-ui/core/Container';
import Button from '../modules/components/Button';
import Footer from '../modules/views/Footer';
import Header from '../modules/views/Header';
import { FormHelperText } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Schema = Yup.object().shape({
  pseudo: Yup.string().required('Requis et plus de 3 lettres')
    .matches(/^.*(?=.{3,}).*$/,
    "Doit contenir au moins 3 caractères"
    ),
  email: Yup.string().required('Requis')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Email invalide'),
  password: Yup.string()
    .min(8, 'Le mot de passe doit avoir minimum 8 caractères')
    .max(20, 'Mot de passe > 20 caractères')
    .matches(
      /^.*(?=.{8,})((?=.*[#?!@$%^&*-]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Doit contenir au moins 8 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial suivant #?!@$%^&*-"
    )
    .required('Requis'),
  passwordVal: Yup.string()
  .when('password', {
    is: (val) => (!!(val && val.length > 0)),
    then: Yup.string().oneOf(
      [Yup.ref('password')],
      'Les deux mots de passe doivent être identiques',
    ),
  })
  .required('Requis'),
});

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  // to initialise the initialValues
  // const email = useSelector((state) => state.email);
  // const password = useSelector((state) => state.password);
  // const pseudo = useSelector((state) => state.pseudo);
  // const passwordVal = useSelector((state) => state.passwordVal);
  const classes = useStyles();
  // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <Formik
      // initialValues={{
      //   pseudo: pseudo,
      //   email: email,
      //   password: password,
      //   passwordVal: passwordVal,
      // }}
      initialValues={{
        pseudo: '',
        email: '',
        password: '',
        passwordVal: '',
      }}
      validationSchema={Schema}
      
      onSubmit={(values) => {
        const newPseudo = values.pseudo;
        dispatch({ type: SYNC_PSEUDO, pseudo : newPseudo });
        
        const newEmail = values.email;
        dispatch({ type: SYNC_EMAIL, email: newEmail });
        
        const newPassword = values.password;
        dispatch({ type: SYNC_PASSWORD, password: newPassword });
        
        const newPasswordVal = values.passwordVal;
        dispatch({ type: SYNC_PASSWORDVAL, passwordVal: newPasswordVal });
        
        // important to put this at the end
        dispatch(signup(history));
      }}
    >
      {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => {
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
                <Typography component="h1" variant="h4">
                  Création de compte
                </Typography>
                <form
                  className={classes.form} 
                  // onSubmit={(evt) => {
                  //   evt.preventDefault();
                  //   // dispatch(sendMessage());
                  // }}
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
                        label="Pseudo"
                        autoFocus
                        helperText="Pseudo requis"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.pseudo}
                      />
                      {errors.pseudo && touched.pseudo ? (
                        <span className="error" style={{ color: "red" }}>
                          {errors.pseudo}
                        </span>
                      ) : null}
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
                        helperText="Email requis"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      {errors.email && touched.email ? (
                        <span className="error" style={{ color: "red" }}>
                          {errors.email}
                        </span>
                      ) : null}
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
                        helperText="Champs Requis - Minimum 1 minuscule, 1 majuscule, 1 chiffre, un des caractères #?!@$%^&*-"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                      />
                      <span className="error" style={{ color: "red" }}>
                        {errors.password}
                      </span>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="passwordVal"
                        label="Mot de passe"
                        type="password"
                        id="passwordVal"
                        autoComplete="current-password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.passwordVal}
                      />
                      <FormHelperText id="my-helper-text-psw2">Veuillez saisir à nouveau le mot de passe requis</FormHelperText>
                      <span className="error" style={{ color: "red" }}>
                        {errors.passwordVal}
                      </span>
                    </Grid>
                    
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                  >
                    Valider
                  </Button>
                  <Grid container justify="center">
                    <Grid item>
                      <Link href="/signin" variant="body2">
                        Vous avez déjà un compte ? Connectez-vous ici
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
            <Footer />
          </div>
        );
      }}
    </Formik>
  );
};
export default withRoot(SignUp);
