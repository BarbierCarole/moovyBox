import 'date-fns';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import withRoot from '../modules/withRoot';
import { useHistory } from "react-router-dom";
import Footer from '../modules/views/Footer';
import Header from '../modules/views/Header';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '../modules/components/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import { loadCSS } from 'fg-loadcss'; // for th icons
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

axios.defaults.withCredentials = true;

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
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    title: {
      textAlign: 'center',
      paddingTop: theme.spacing(1),
      margin: theme.spacing(1),
    },
    paperButton: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  toast.configure();

const FormMove = () => {
  const classes = useStyles();
  let history = useHistory();
  const [label, setLabel] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(new Date());


  // const [reminder, setReminder] = useState({checked: true});

  // const handleReminderChange = (e) => {
  //     setReminder({ ...reminder, [event.target.name]: event.target.checked});
  // }

  const successMove = () => {
    toast.success('Votre déménagement a bien été créé !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      closeOnClick: true
    })
  }

  const errorMove = () => {
    toast.error('Une erreur est survenue. Veuillez réessayer ultérieurement !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      closeOnClick: true
    })
  }

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleLabelChange = (e) => {

      setLabel(e.target.value);
  };

  const handleAddressChange = (e) => {

      setAddress(e.target.value);
  };

  const handleSubmit = (e) => {
      e.preventDefault();

      const data = {label, address, date};

      console.log(data)

      axios.post('http://localhost:5050/move', data)
            .then(res => {
              console.log(res);
              history.push({
                pathname:"/move/"})
              successMove();
            }).catch(err => {
              console.log(err);
              errorMove();
            });
  };

  // for the font awesome heavy
  useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
  }, []);

  return (
    <div className={classes.root}>
    <CssBaseline />
    <Header />
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Icon className="fas fa-truck" color="secondary" style={{ fontSize: 30, width: 45 }}/>
        <Typography component="h1" variant="h4"  className={classes.title}>
        Création d'un déménagement
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
                helperText="* Requis"
                label="Entrez un nom pour votre déménagement"
                value={label}
                onChange={handleLabelChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Adresse"
                helperText="* Requis"
                value={address}
                onChange={handleAddressChange}
              />
            </Grid>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd-MM-yyyy"
                    // type="date.format"
                    margin="normal"
                    helperText="* Requis"
                    id="date-picker-inline"
                    value={date}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                    'aria-label': 'change date',
                    }}
                />
            </Grid>
            </MuiPickersUtilsProvider>
            {/* <Grid item xs={12}>
            <FormControlLabel
                control={
                    <Switch
                        checked={reminder.checked}
                        onChange={handleReminderChange}
                        name="checked"
                        color="primary"
                    />
                }
                label="Voulez-vous un rappel"
            />
            </Grid> */}
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Link to="/move">
                <Button
                variant="outlined"
                color="primary"
                fullWidth
                className={classes.submit}
                >
                  Annuler
                </Button>
              </Link>

            </Grid>
            <Grid item xs={8}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                // href="/move"
              >
                Valider
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    <Footer />
  </div>
  );
};

export default withRoot(FormMove);
