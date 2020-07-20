import React, {useState, useEffect} from 'react';
import withRoot from '../modules/withRoot';
import Footer from '../modules/views/Footer';
import Header from '../modules/views/Header';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import {BrowserRouter as Router, Link} from "react-router-dom";
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
// for the icon fontasome
import { loadCSS } from 'fg-loadcss'; // for th icons
import Icon from '@material-ui/core/Icon';
import CssBaseline from '@material-ui/core/Icon';
// to confirm
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ButtonCustom from '../modules/components/Button';
// to redirection signin
import { useSelector } from 'react-redux';
import { Redirect} from 'react-router';
import { toast } from 'react-toastify';
// search
import SearchIcon from '@material-ui/icons/Search';
import { fade} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    // for the font awesome
    '& > .fas': {
      margin: theme.spacing(2),
     
    },
  },

  liste: {
    marginTop: theme.spacing(5),
    textAlign: 'center',

  },
  // btn for the button of moves and boxes
 
  title: {
    textAlign: 'center',
    paddingTop: theme.spacing(1),
    margin: theme.spacing(1),
  },
  dialogTitle: {
    backgroundColor: theme.palette.secondary.main,
  },
  
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  fab: {
    marginRight: theme.spacing(3),
  },
  arround: { 
    width: 40,
    height: 40,
    display: 'flex',
    overflow: 'hidden',
    alignItems: 'center',
    flexShrink: 0,
    lineHight: 1,
    userSelect: 'none',
    borderRadius: 20,
    justifyContent: 'center', 
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,

  },
  btn: {
    width: '90%',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    textTransform: "none",
    fontWeight: 500,
  },
  arrow: { 
    margin: theme.spacing(0,1, 0,1 ),
   
  },
  // research
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  
}));

toast.configure();

const BoxesByMove = (props) => {
  const classes = useStyles();
  const [boxes, setBoxes] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  // to confirm
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();
  

  const isLogged = useSelector((state) => state.isLogged);

  const successDelete = () => {
    toast.success('Votre carton a bien été supprimé !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      closeOnClick: true
    })
  }

  const errorDelete = () => {
    toast.error('Une erreur est survenue. Veuillez réessayer ultérieurement !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      closeOnClick: true
    })
  }

  if (!isLogged) {
    console.log('isLogged',isLogged);
    //console.log('email,password page App/index',email,password);
    return <Redirect to="/signin" />;
  };

 // for the font awesome heavy
 useEffect(() => {
  loadCSS(
    'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
    document.querySelector('#font-awesome-css'),
  );
}, []);

// requeste to display all the boxes of 1 move selected
useEffect(() => {
  axios.get(`http://localhost:5050/move/${props.location.state.id}`)
  .then(res => {
    setBoxes(res.data);
  })
  .catch(err => {
    console.log(err);
  })
}, []);

//search function
useEffect(() => {
  setFilteredItems(
    boxes.filter(box =>
      box.label.toLowerCase().includes(search.toLowerCase()))
  );
}, [search, boxes]); 

// delete a box selected
// const handleBoxDelete = (id) => {

//   axios.delete(`http://localhost:5050/box/${id}`)
//        .then(res => {
//         setBoxes(boxes.filter((boxe)=>(boxe.id !== id)));
//        }).catch(err => {
//         console.log(err);
//       })
// };
const handleDelete = (props) => {

  console.log('cliqué, props', props);
  const id = props.selectedId;
  console.log('id : ', id);
  

  axios.delete(`http://localhost:5050/box/${id}`)
       .then(res => {
        setBoxes(boxes.filter((boxe)=>(boxe.id !== id)));
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

const deleteZero = (str) => {
  const reg=/(^|[^\d.])0+(?!\.)/g;
  return str= str.replace(reg,'');
}

  return (
    <div className={classes.root}>
      <Header />
      {/* test */}
      {/* research */}
      
        <AppBar position="static">
          <Toolbar>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Recherche…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'Recherche' }}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </Toolbar>
        </AppBar>
     
      {/* end research */}
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <div className={classes.paper}>
          
          <Icon className="fas fa-box-open" color="secondary" style={{ fontSize: 30, width: 45 }}/>
          
          <Typography component="h1" variant="h4"  className={classes.title}>
            Listes des cartons de mon déménagement
          </Typography>
          
          <Link to ={{
              pathname:"/create-box",
              state: {
                id: props.location.state.id,
              }
          }}>
          <Typography component="h1" variant="h5" className={classes.title}>
            <Tooltip title="Ajouter" aria-label="Add">
              <Fab color="secondary" className={classes.fab}>
                <AddIcon />
              </Fab>
            </Tooltip>
            <Button size="medium" variant="outlined" color="primary" >Créer un nouveau carton</Button>
          </Typography>
          </Link>
          <Typography variant="h5"  className={classes.title}>
            Cliquer sur les cartons pour consulter ou ajouter du contenu.
          </Typography>
          <ul className={classes.liste}>
          {filteredItems.map(boxe =>
            <li key={boxe.id}>
              <Link to={{
                pathname:"/box/"+boxe.id,
                 state: {
                   id: boxe.id
                  }
                }}>

                <Button 
                variant="outlined" 
                color="primary" 
                className={classes.btn} 
                >
                <Grid container
                container
                direction="row"
                justify="center"
                alignItems="center"
                >
                  
                  <Grid item xs={12}>
                   <Typography>
                      {boxe.label} 
                      <ArrowRightAltIcon color="secondary" className={classes.arrow}/> {boxe.destination_room}
                   </Typography> 
                  </Grid>
                  <Grid item xs={12}
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  >
                  {(() => {
                    if (boxe.heavy===true) {
                      return (
                        <Typography>
                          <Icon className="fas fa-weight-hanging" color="secondary" style={{ marginRight: 10 }} 
                        />
                          Lourd 
                        </Typography>
                      )
                    }
                  })()} 
                  {(() => {
                    if (boxe.floor===true) {
                      return (
                        <Typography>
                          <Icon className="fas fa-level-up-alt" color="secondary" style={{  marginRight: 10 }} />
                          Etage
                        </Typography>
                        
                      )
                    }
                  })()}
                  {(() => {
                    if (boxe.fragile===true) {
                      return (
                        <Typography>
                          <Icon className="fas fa-wine-glass" color="secondary" style={{  marginRight: 10 }} />
                          Fragile
                        </Typography>
                      )
                    }
                  })()}
                  </Grid>
                  <Grid >
                  <Typography className={classes.arround}> {deleteZero(boxe.code) } 
                  </Typography>
                  
                  </Grid>
                </Grid>
                </Button>
                </Link>
                
                <DeleteIcon fontSize="large" color="secondary" onClick={() => {handleClickOpen(boxe.id)}}/>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title" className={classes.dialogTitle} color="secondary">{"Confirmation de suppression"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Etes-vous sûr de vouloir supprimer ce carton et tout son contenu définitivement ?
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

export default withRoot(BoxesByMove);
