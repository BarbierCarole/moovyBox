import React, {useState, useEffect} from 'react';
import axios from 'axios';
import withRoot from '../modules/withRoot';
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import Footer from '../modules/views/Footer';
import Header from '../modules/views/Header';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '../modules/components/Button';
// Date
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { loadCSS } from 'fg-loadcss'; // for the icons
import Icon from '@material-ui/core/Icon';
import { toast } from 'react-toastify';
// the style
import useStyles from './styles/styles';
// to know the move_id concerned

import { useLocation } from "react-router-dom";

axios.defaults.withCredentials = true;

toast.configure();

const UpdateMove = () => {

  const location = useLocation();

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const classes = useStyles();
  let history = useHistory();
  // let d = new Date(location.state.date) ;
  // ↓ to be use with the time to have a good date if non it's displayed one day less ↓
  // d.setTime( d.getTime() - new Date().getTimezoneOffset()*60*1000 );
 

  // const [moveId, setMoveId] = useState(location.state.id);
  const [label, setLabel] = useState(location.state.label);
  const [address, setAddress] = useState(location.state.address);
  const [date, setDate] = useState(location.state.date);
  console.log(">> updateMove : date",date);

  const successMove = () => {
    toast.success('Votre déménagement a bien été créé !', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      closeOnClick: true
    })
  }

  const errorMove = () => {
    toast.error('Une erreur est survenue. Veuillez réessayer ultérieurement !', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      closeOnClick: true
    })
  }

  const handleDateChange = (date) => {
      setDate(date);
    
  };

  const handleLabelChange = (label) => {
      setLabel(label.target.value);
  };

  const handleAddressChange = (address) => {
      setAddress(address.target.value);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      const data = {label, address, date};
      console.log(">> data :",data);
      axios.put( BASE_URL+`/api/move/${location.state.id}`, data)
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
        Modification du déménagement {location.state.label}
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
                label="Nom du déménagement"
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
            <Typography>
              Date du déménagement
            </Typography>
            
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
           
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    autoOk
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
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
                Corriger
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

export default withRoot(UpdateMove);
