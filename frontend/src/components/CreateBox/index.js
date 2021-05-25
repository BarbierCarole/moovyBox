import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect} from "react-router-dom";
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import QueueIcon from '@material-ui/icons/Queue';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Checkbox from '@material-ui/core/Checkbox';
// pour ajouter le theme
import withRoot from '../modules/withRoot';
// import Button from '../modules/components/Button';
import Footer from '../modules/views/Footer';
import Header from '../modules/views/Header';
import TextField from '@material-ui/core/TextField';
import { loadCSS } from 'fg-loadcss'; // for th icons
import Icon from '@material-ui/core/Icon';
// to the redirection of signin
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// to the style !
import useStyles from './styles/styles';
import GoBack from '../modules/components/GoBack'; 

// to save the token in cookies https://flaviocopes.com/axios-credentials/
// axios.defaults.withCredentials = true;

toast.configure();

function CreateBox(props) {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
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
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      closeOnClick: true
    })
  }

  const errorBox = () => {
    toast.error('Une erreur est survenue. Veuillez réessayer ultérieurement !', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
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
    e.preventDefault();
    console.log('input au onChange', e.target.checked);
    setFragile(e.target.checked);
  }
  function handleFloorChange(e) {
    e.preventDefault();
    console.log('input au onChange', e.target.checked);
    setFloor(e.target.checked);
  }
  function handleHeavyChange(e) {
    e.preventDefault();
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
      .post(BASE_URL+`/api/move/:moveId/boxes`, { label, destination_room, fragile, heavy, floor, move_id})
      .then((res => {
        console.log(res);
        console.log("res.data",res.data);
        console.log("move_id", move_id);
        console.log("cb res.data.id", res.data.id);
        // history.push({
        //   pathname:"/move/"+move_id,
        //   state: {
        //     id: move_id,
        //     label:props.location.state.label,
        //   }
        // });
        history.push({
            pathname:"/box/"+res.data.id,
            state: {
              id: res.data.id,
              label: res.data.label,
              code:res.data.code,              
              move_id: move_id,
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
        <Typography component="p" variant="h5">
            <GoBack /> Retour à la liste des cartons 
        </Typography>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
           <QueueIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            J'ajoute un carton dans "{props.location.state.label}"
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
            <Grid
              container
              direction="column"
              justify="space-between"
              alignItems="center"
            >
              <Typography component="h1" variant="h5" className={classes.margin}>
                Mon carton est :
              </Typography>
              <Grid item xs={2}></Grid>
              <Grid 
                container
                item
                xs={8}
                direction="row"
                justify="space-evenly"
                alignItems="center"
              >
                <Grid item xs={1}>
                  <Checkbox
                    checked={fragile}
                    onChange={handleFragileChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                </Grid> 
                <Grid item xs={5}>
                <Typography component="p" variant="h5">Fragile </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Icon className="fas fa-wine-glass" color="secondary" />
                </Grid>
              </Grid> 
              <Grid item xs={2}></Grid> 
              <Grid item xs={2}></Grid>
              <Grid 
                container
                xs={8}
                item
                direction="row"
                justify="space-evenly"
                alignItems="center"
              >
                <Grid item xs={1}>
                <Checkbox
                    checked={heavy}
                    onChange={handleHeavyChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                </Grid> 
                <Grid item xs={5}>
                <Typography component="p" variant="h5">Lourd </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Icon className="fas fa-weight-hanging" color="secondary" />
                </Grid>
              </Grid> 
              <Grid item xs={2}></Grid>
              <Grid  itemxs={2}></Grid>
              <Grid 
                container
                item
                xs={8}
                direction="row"
                justify="space-evenly"
                alignItems="center"
              >
                <Grid item xs={1}>
                <Checkbox
                    checked={floor}
                    onChange={handleFloorChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}

                />
                </Grid> 
                <Grid item xs={5}>
                <Typography component="p" variant="h5">A l'étage </Typography> 
                </Grid>
                <Grid item xs={2}>
                  <Icon className="fas fa-level-up-alt" color="secondary" />
                </Grid>
              </Grid> 
              <Grid item xs={2}></Grid>
              
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
          </Grid>
        </form>
      </div>
      </Container>
      <Footer />
    </div>
  );
}
export default withRoot(CreateBox);
