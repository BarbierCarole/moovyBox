import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles/styles';
import withRoot from '../modules/withRoot';
import Footer from '../modules/views/Footer';
import Header from '../modules/views/Header';
import Button from '@material-ui/core/Button';
import {Card, CardHeader, CardContent, Avatar } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// pour message d'erreur
import { toast } from 'react-toastify';
// to redirection signin
import { useSelector } from 'react-redux';
import { Redirect} from 'react-router';
import DateFnsUtils from '@date-io/date-fns';
// import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

axios.defaults.withCredentials = true;

const CreateTask = (props) => {
  const classes = useStyles();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  
  const [label, setLabel] = useState('');
  const [date_perso, setDatePerso] = useState(new Date());
  const [contact, setContact] = useState('');
  const [note, setNote] = useState('');
  const [description,setDescription] = useState('');
  const [moveId, setMoveId] = useState(props.location.state.moveId);

  const isLogged = useSelector((state) => state.isLogged);
  console.log("State of isLogged : ",isLogged);
  if (!isLogged) {
    console.log('isLogged',isLogged);
    //console.log('email,password page App/index',email,password);
    return <Redirect to="/signin" />;
  };

  // message d'erreur
  const errorDelete = () => {
    toast.error('Le label est obligatoire', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      closeOnClick: true
    })
  }
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
    e.preventDefault();
    console.log('input au onChange', e.target.value);
    setContact(e.target.value);
  }
  function handleDescriptionChange(e) {
    e.preventDefault();
    console.log('input au onChange', e.target.value);
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault(); // stops default reloading behaviour
    axios
      .post(BASE_URL+`/api/move/${props.location.state.moveId}/task`, { label, note, description, contact, date_perso })
      .then((res => {   
        window.history.back();
      })
      )
      .catch(err => {
        console.log(err);
        errorDelete();
      });
  }
  return (

    <div className={classes.root}>
        <Header />
        <Card className={classes.card}>
          
          <CardContent>
            
            <Typography variant="h4" component="h1" gutterBottom>
             
              Création d'une nouvelle tâche
            </Typography>  
            <form
              className={classes.form}
              noValidate
              onSubmit={handleSubmit}
            >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                label="Multiline"
                  multiline
                  rowsMax={4}
                  autoComplete="label"
                  name="label"
                  variant="outlined"
                  required
                  fullWidth
                  id="label"
                  label="Titre de la tâche"
                  autoFocus
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
                label="Multiline"
                  multiline
                  rowsMax={4}
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
                label="Multiline"
                  multiline
                  rowsMax={4}
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
                    Ajouter
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
export default withRoot(CreateTask);