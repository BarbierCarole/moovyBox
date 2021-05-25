import React, {useState, useEffect} from 'react';
import withRoot from '../modules/withRoot';
import Footer from '../modules/views/Footer';
import Header from '../modules/views/Header';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
// import moment from 'moment';
import {BrowserRouter as Router, Link} from "react-router-dom";
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// for the icon fontasome
import { loadCSS } from 'fg-loadcss'; // for th icons
import Icon from '@material-ui/core/Icon';
import CssBaseline from '@material-ui/core/Icon';
import CreateIcon from '@material-ui/icons/Create';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
// to confirm
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonCustom from '../modules/components/Button';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// to the style !
import useStyles from './styles/styles';

// date
import { format } from 'date-fns'

toast.configure();

const Move = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const classes = useStyles();
  const [moves, setMoves] = useState([]);
  // to confirm
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();

  const successDelete = () => {
    toast.success('Votre déménagement a bien été supprimé !', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      closeOnClick: true
    })
  }

  const errorDelete = () => {
    toast.error('Une erreur est survenue. Veuillez réessayer ultérieurement !', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      closeOnClick: true
    })
  }

  useEffect(() => {
    axios.get(BASE_URL+'/api/move')
         .then(res => {
           console.log(res.data);
           setMoves(res.data);
         })
         .catch(err => {
           console.log(err);
         })
  }, []);


  const handleDelete = (props) => {

    console.log('cliqué, props', props);
    const id = props.selectedId;
    console.log('id : ', id);

  
    axios.delete(BASE_URL+`/api/move/${id}`)
         .then(res => {
          setMoves(moves.filter((move)=>(move.id !== id)));
          setOpen(false);
          successDelete();
         }).catch(err => {
          console.log(err);
          errorDelete();
        })
  };

  // to confirm
  const handleClickOpen = (value) => {
    setOpen(true);
    setSelectedId(value)

  };

  const handleClose = () => {
    setOpen(false);
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
      <Header />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Icon className="fas fa-truck" color="secondary" style={{ fontSize: 30, width: 45 }}/>

          <Typography component="h1" variant="h4"  className={classes.title}>
            Mes déménagements
          </Typography>
          <Link to="/create-move">
            <Typography component="h1" variant="h5" className={classes.title}>
              <Tooltip title="Ajouter" aria-label="Add">
                <Fab color="primary" className={classes.fab}>
                  <AddIcon />
                </Fab>
              </Tooltip>
              <Button size="medium" variant="outlined" color="secondary" style={{marginLeft: '15px'}}>Ajouter un déménagement</Button>
            </Typography>

          </Link>
            <ul className={classes.liste}>
              {moves.map(move => <li key={move.id}>
                <Link to ={{
                  // pathname:"/move/"+move.id,
                  pathname:`/move/${move.id}/homeMoveSelected`,
                  state: {
                    id: move.id,
                    label: move.label,
                  }
                }}>
                <Button
                variant="outlined"
                color="secondary"
                //href={"/move/"+move.id} mettre LINK
                // href={"/create-box"}
                className={classes.btn}
                >
                <Grid container>
                  <Grid item xs={12}>
                  <IconButton color="primary" aria-label="To display my move" component="span">
                    <SearchIcon /> 
                  </IconButton> Consulter mon déménagement
                  </Grid>
                  <Grid item xs={12}>
                  <Typography> nom : {move.label}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                  <Typography>Adresse : {move.address}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                  <Typography>Date : {format(new Date(move.date),'dd/MM/yyyy')}</Typography>
                  </Grid>

                </Grid>
                </Button>
                </Link>
                <Link to ={{
                  // pathname:"/move/"+move.id,
                  pathname:`/move/${move.id}/modify`,
                  state: {
                    id: move.id,
                    label: move.label,
                    address: move.address,
                    date: move.date
                  }
                }}>
                <CreateIcon fontSize="large" color="secondary"/> 
                </Link>
                <DeleteIcon fontSize="large" color="secondary" onClick={() => {handleClickOpen(move.id)}}/>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title" className={classes.dialogTitle} color="secondary">{"Confirmation de suppression"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Etes-vous sûr de vouloir supprimer ce déménagement ? Cette action entrainera la suppression de tous les cartons et leur contenu.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="primary" >
                      Annuler
                    </Button>
                    <ButtonCustom
                      type="submit"
                      fullWidth
                      variant="contained"
                      onClick={() => {handleDelete({selectedId})} }
                      color="secondary"
                      // className={classes.submit}
                    >
                      Confirmation de suppression
                    </ButtonCustom>
                    {/* <Button onClick={() => {handleDelete({selectedId})} }color="secondary" autoFocus>
                      Confirmation de suppression
                    </Button> */}
                  </DialogActions>
                </Dialog>
                </li>)}
            </ul>
          </div>
      </Container>
      <Footer />
    </div>
  );
};

export default withRoot(Move);
