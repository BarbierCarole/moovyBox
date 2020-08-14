import withRoot from '../modules/withRoot';

import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '../modules/components/Button';
import Footer from '../modules/views/Footer';
import Header from '../modules/views/Header';
import { FormHelperText } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

const Schema = Yup.object().shape({
  nickname: Yup.string().required('Requis'),
  email: Yup.string().required('Requis')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Email invalide'),
  // password: Yup.string()
  //   .min(8, 'Le mot de passe doit avoir minimum 8 caractères')
  //   .max(20, 'Mot de passe > 20 caractères')
  //   .matches(
  //     /^.*(?=.{8,})((?=.*[#?!@$%^&*-]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
  //     "Doit contenir au moins 8 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial suivant #?!@$%^&*-"
  //   )
  //   .required('Requis'),
  // changepassword: Yup.string().when('password', {
  //   is: (val) => (!!(val && val.length > 0)),
  //   then: Yup.string().oneOf(
  //     [Yup.ref('password')],
  //     'Les deux mots de passe doivent être identiques',
  //   ),
  // }),
});

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Profile = () => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        nickname: 'Carole',
        email: 'carole83460@gmail.com',
        // password: '********',
        // changepassword: '********',
      }}
      validationSchema={Schema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400)}
      }
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
                  <AccountCircleIcon />
                </Avatar>
                <Typography component="h1" variant="h4">
                  Mon profil
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
                        autoComplete="nickname"
                        name="nickname"
                        variant="outlined"
                        required
                        fullWidth
                        id="nickname"
                        label="Pseudo"
                        autoFocus
                        helperText="Pseudo requis"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.nickname}
                      />
                      {errors.nickname && touched.nickname ? (
                        <span className="error" style={{ color: "red" }}>
                          {errors.nickname}
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
                      <Link href="/#" variant="body2">
                        Je veux changer de mot de passe
                      </Link>
                    </Grid>
                    {/*  ************   new Password 
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
                        name="changepassword"
                        label="Mot de passe"
                        type="password"
                        id="changepassword"
                        autoComplete="current-password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.changepassword}
                      />
                      <FormHelperText id="my-helper-text-psw2">Veuillez saisir à nouveau le mot de passe requis</FormHelperText>
                      <span className="error" style={{ color: "red" }}>
                        {errors.changepassword}
                      </span>
                    </Grid> */}
                    
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
export default withRoot(Profile);
