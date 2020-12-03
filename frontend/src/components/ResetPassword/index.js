
import React from 'react';

import Avatar from '@material-ui/core/Avatar';

import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Formik } from 'formik';
import * as Yup from 'yup';
import withRoot from '../modules/withRoot';
import Button from '../modules/components/Button';
import Footer from '../modules/views/Footer';
import Header from '../modules/views/Header';
// to the style !
import useStyles from './styles/styles';

// 1 - l'api YUP utilise ces objets pour la validation des données
const Schema = Yup.object().shape({
  email: Yup.string().required('Requis')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Email invalide'),
});


const ResetPassword = () => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={Schema}
      // send an alert to view the content of the form
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values, errors, touched, handleSubmit, handleChange, handleBlur,
      }) => (
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
                Mot de passe perdu ? 
              </Typography>
              <Typography component="h4" className={classes.subtitle1} variant="alignCenter">
                Pas de problème !
                Communiquez nous l'adresse mail renseignée dans votre compte MoovyBoxy.com afin de réinitialiser votre mot de passe.
              </Typography>
              <form
                className={classes.form}
                noValidate
                onSubmit={handleSubmit}
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
                      helperText="Email requis"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {errors.email && touched.email ? (
                      <span className="error" style={{ color: 'red' }}>
                        {errors.email}
                      </span>
                    ) : null}
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                >
                  Je réinitialise mon mot de passe
                </Button>
              </form>
            </div>
          </Container>
          <Footer />
        </div>
      )}
    </Formik>
  );
};
export default withRoot(ResetPassword);
