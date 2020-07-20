// index-Chris.js sur modèle Chris
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Link, Redirect} from "react-router-dom";
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import QueueIcon from '@material-ui/icons/Queue';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Checkbox from '@material-ui/core/Checkbox';
import withRoot from '../modules/withRoot';
// import Button from '../modules/components/Button';
import Footer from '../modules/views/Footer';
import Header from '../modules/views/Header';
import TextField from '@material-ui/core/TextField';
import { loadCSS } from 'fg-loadcss'; // for th icons
import Icon from '@material-ui/core/Icon';
// to redirection signin
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    '& > .fa': {
      margin: theme.spacing(2),
    },
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
  margin: {
    margin: theme.spacing(1, 0, 2),
  },
}));

axios.defaults.withCredentials = true;

toast.configure();

function CreateBox(props) {
  let history = useHistory(); // to return on move/:id

  const classes = useStyles();
  const [label, setLabel] = useState('');
  const [destination_room, setDestinationRoom] = useState('');
  const [fragile, setFragile] = useState(true);
  const [floor, setFloor] = useState(true);
  const [heavy, setHeavy] = useState(true);

  const [move_id, setMoveId] = useState(props.location.state.id);

  const isLogged = useSelector((state) => state.isLogged);
  if (!isLogged) {
    console.log('isLogged',isLogged);
    //console.log('email,password page App/index',email,password);
    return <Redirect to="/signin" />;
  };

  const successBox = () => {
    toast.success('Votre carton a bien été créé !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      closeOnClick: true
    })
  }

  const errorBox = () => {
    toast.error('Une erreur est survenue. Veuillez réessayer ultérieurement !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      closeOnClick: true
    })
  }

  function handleLabelChange(e) {
    console.log('input au onChange label ', e.target.value);
    setLabel(e.target.value);
  }
  function handleDestinationRoomChange(e) {
    console.log('input au onChange', e.target.value);
    setDestinationRoom(e.target.value);
  }
  function handleFragileChange(e) {
    console.log('input au onChange', e.target.checked);
    setFragile(e.target.checked);
  }
  function handleFloorChange(e) {
    console.log('input au onChange', e.target.checked);
    setFloor(e.target.checked);
  }
  function handleHeavyChange(e) {
    console.log('input au onChange', e.target.checked);
    setHeavy(e.target.checked);
  }
  // for the font awesome heavy
  useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
  }, []);

  function handleSubmit(e) {
    e.preventDefault(); // stops default reloading behaviour

    axios
      .post(`http://localhost:5050/box`, { label, destination_room, fragile, heavy, floor, move_id})
      .then((res => {
        console.log(res);
        console.log(res.data);
        console.log("move_id", move_id);
        history.push({
          pathname:"/move/"+move_id,
          state: {
            id: move_id,
          }
        });
        successBox();
        // () => (() => history.push('/move/'+move_id));
        // () => history.goBack();
        // return (() => history.push('/move/'+move_id))();

      })
      )
      .catch(err => {
        console.log(err);
        errorBox();
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
           <QueueIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            J'ajoute un carton
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
                  label="Nom du carton"
                  autoFocus
                  helperText="Un nom est requis"
                  value={label}
                  onChange={handleLabelChange}
                />{' '}

            </Grid>
            <Grid item xs={12}>
            <TextField
                  autoComplete="Pièce de destination"
                  name="destinationRoom"
                  variant="outlined"
                  required
                  fullWidth
                  id="destinationRoom"
                  label="Pièce de destination"
                  autoFocus
                  helperText="Un nom est requis"
                  value={destination_room}
                  onChange={handleDestinationRoomChange}
                />{' '}
              </Grid>
            <Grid item xs={12} className={classes.margin} container
              direction="row"
              justify="center"
              >
              <Typography component="h1" variant="h5" className={classes.margin}>
                Mon carton est :
              </Typography>
              <Grid item xs={12}>
                <Checkbox
                  checked={fragile}
                  onChange={handleFragileChange}
                  inputProps={{ 'aria-label': 'primary checkbox' }}

                /> Fragile <Icon className="fas fa-wine-glass" color="secondary" />
              </Grid>
              <Grid item xs={12}>
                <Checkbox
                  checked={heavy}
                  onChange={handleHeavyChange}
                  inputProps={{ 'aria-label': 'primary checkbox' }}

                />  Lourd <Icon className="fas fa-weight-hanging" color="secondary" />
              </Grid>
              <Grid item xs={12}>
                <Checkbox
                  checked={floor}
                  onChange={handleFloorChange}
                  inputProps={{ 'aria-label': 'primary checkbox' }}

                /> A l'étage <Icon className="fas fa-level-up-alt" color="secondary" />
              </Grid>

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
      </div>
      </Container>
      <Footer />
    </div>
  );
}
export default withRoot(CreateBox);
