import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles/styles';
import withRoot from '../modules/withRoot';
import Footer from '../modules/views/Footer';
import Header from '../modules/views/Header';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Card, CardHeader, CardContent, Avatar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


// to redirection signin
import { useSelector } from 'react-redux';
import { Redirect} from 'react-router';
import {Link} from "react-router-dom";

import DateFnsUtils from '@date-io/date-fns';
// import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import { format, formatDistance, formatRelative, subDays } from 'date-fns'

axios.defaults.withCredentials = true;
const UpdateTask = (props) => {
  const classes = useStyles();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  console.log('>> l.33 updateTask props :',props);
  const [label, setLabel] = useState(props.location.state.label);
  const [date_perso, setDatePerso] = useState(props.location.state.date_perso);
  const [contact, setContact] = useState(props.location.state.contact);
  const [note, setNote] = useState(props.location.state.note);
  const [description,setDescription] = useState(props.location.state.description);
  const [is_realised, SetIsRealised] = useState(props.location.state.is_realised);
  const [moveId, setMoveId] = useState(props.location.state.moveId);
  
  const taskId = props.location.state.taskId;
  const id = props.location.state.id;
 
  const isLogged = useSelector((state) => state.isLogged);
  console.log("State of isLogged : ",isLogged);
  if (!isLogged) {
    console.log('isLogged',isLogged);
    //console.log('email,password page App/index',email,password);
    return <Redirect to="/signin" />;
  };

  // soumission du formulaire
  function handleLabelChange(e) {
    console.log('input au onChange label ', e.target.value);
    setLabel(e.target.value);  
  }
  const handleDateChange = (date) => {
    setDatePerso(date);
  };
  function handleNoteChange(e) {
    console.log('input au onChange', e.target.value);
    setNote(e.target.value);
  }
  function handleContactChange(e) {
    console.log('input au onChange', e.target.value);
    setContact(e.target.value);
  }
  function handleDescriptionChange(e) {
    console.log('input au onChange', e.target.value);
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault(); // stops default reloading behaviour
    axios
      .put(BASE_URL+`/api/move/${id}/tasksList/${taskId}`, { note, contact, date_perso, is_realised })
      .then((res => {
        })
      )
      .catch(err => {
        console.log(err);
      });
    axios
    .put(BASE_URL+`/api/move/${id}/task/${taskId}`, { label, description })
    .then((res => {
      window.history.back();
    })
    )
    .catch(err => {
      console.log(err);
    });
  }
  return (

    <div className={classes.root}>
        <Header />
        <Card className={classes.card}>
          
          <CardContent>
            
            <Typography variant="h4" component="h1" gutterBottom>
              Modification de la tâche
            </Typography>       
        
            <form
              className={classes.form}
              noValidate
              onSubmit={handleSubmit}
            >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="label"
                  name="label"
                  variant="outlined"
                  required
                  fullWidth
                  id="label"
                  label="Titre de la tâche"
                  
                  helperText="Un texte est requis"
                  value={label}
                  onChange={handleLabelChange}
                />{' '}
              </Grid>
              <Grid className={classes.margin}>
                Date de réalisation de ma nouvelle tâche :
              </Grid>
              <MuiPickersUtilsProvider utils={DateFnsUtils}> 
                <Grid container className={classes.margin} >  
                    <KeyboardDatePicker
                        
                        format="dd/MM/yyyy"
                        // type="date.format"
                        margin="normal"
                        helperText="* Requis"
                        id="date-picker-inline"
                        value={date_perso}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                        'aria-label': 'change date',
                        }}
                        margin="normal"
                    />
                </Grid>
              </MuiPickersUtilsProvider>
              <Grid item xs={12}>
                <TextField
                  autoComplete="Description"
                  name="description"
                  variant="outlined"          
                  fullWidth
                  id="description"
                  label="Description de la tâche"
                           
                  value={description}
                  onChange={handleDescriptionChange}
                />{' '}
              </Grid>
              {/* Mettre ici le champ de date */}
              <Grid item xs={12}>
                <TextField
                  autoComplete="Mes notes"
                  name="note"
                  variant="outlined"          
                  fullWidth
                  id="note"
                  label="Mes notes"
                           
                  value={note}
                  onChange={handleNoteChange}
                />{' '}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="Mes contacts"
                  name="contact"
                  variant="outlined"          
                  fullWidth
                  id="contact"
                  label="Mes contacts"
                          
                  value={contact}
                  onChange={handleContactChange}
                />{' '}
              </Grid>
              <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                  >
                    Modifier
                  </Button>

              </Grid>
            </Grid>
            
          </form>
          </CardContent>
        </Card> 
        
        <Footer />
    </div> 
  );
}
export default withRoot(UpdateTask);