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
import {BrowserRouter as Router, Link} from "react-router-dom";
import axios from 'axios';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// for the icon fontasome
import { loadCSS } from 'fg-loadcss'; // for th icons
import Icon from '@material-ui/core/Icon';
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
import { fade} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// search
import SearchIcon from '@material-ui/icons/Search';
//
import Paper from '@material-ui/core/Paper';
import LocationOnIcon from '@material-ui/icons/LocationOn';
//checkbox
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//to display in a card
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    flexWrap: 'wrap',
    alignContent: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    // for the font awesome
    '& > .fas': {
      margin: theme.spacing(2),     
    },
    backgroundColor:'#eeeeee',
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
  bgSecondary: {
    backgroundColor: fade(theme.palette.secondary.main, 0.15),
  },
  bgPrimary: {
    backgroundColor: fade(theme.palette.primary.main, 0.25),
  },
  
  fab: {
    marginRight: theme.spacing(-3),
    zIndex:'1000',
  },
  nbrBox: {
    color: '#fff',
    marginTop: '-33px',
    fontWeight: 'bold',
  },
  justifyContentSpaceBetween: {
    justifyContent: 'space-between',
    // backgroundColor: fade(theme.palette.primary.main, 0.25),
  },
  titleBox: { 
    // height: 30,
    display: 'flex',
    overflow: 'hidden',
    alignItems: 'center',
    padding: theme.spacing(1,3),   
    lineHight: 1,
    userSelect: 'none',
    justifyContent: 'center', 
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,

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
  textLeft: {
    textAlign: 'left',
  },
  card: {
    width: '90%',
    margin: theme.spacing(1),
    display: "flex", 
    justifyContent: "center" 
  },
  
  boxLi: {
    width: '100%',
    backgroundColor: '#ffffff',    
  }  
  
}));

toast.configure();

const BoxesByMove = (props) => {
  const classes = useStyles();
  const [boxes, setBoxes] = useState([]);
  
  // To confirm
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();
  // for the research
  const [searchedItem, setSearchedItem] = useState("");


  const isLogged = useSelector((state) => state.isLogged);

  const [filteredItems, setFilteredItems] = useState([]);
  const [stateOptionChecked, setStateOptionChecked] = useState({
    fragile: false,
    heavy: false,
    floor: false,
  });

    // to display the boxes with checkbox checked
  useEffect(() => {
    setFilteredItems(
      boxes.filter(box =>
        ((box.heavy===true && stateOptionChecked.heavy===true) || (stateOptionChecked.heavy===false)) 
        && ((box.floor===true && stateOptionChecked.floor===true) || (stateOptionChecked.floor===false))
        && ((box.fragile===true && stateOptionChecked.fragile===true) || (stateOptionChecked.fragile===false)) 
      ) 
    );
  }, [stateOptionChecked, boxes]); 

  const handleChange = (event) => {
    setStateOptionChecked({ ...stateOptionChecked, [event.target.name]: event.target.checked });
    console.log("CB stateOptionChecked",stateOptionChecked);
  };  

  const successDelete = () => {
    toast.success('Votre carton a bien été supprimé !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      closeOnClick: true
    })
  }

  const errorDelete = () => {
    toast.error('Une erreur est survenue. Veuillez réessayer ultérieurement !', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
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
    axios.get(`http://localhost:5050/api/move/${props.location.state.id}/boxes`)
    .then(res => {
      setBoxes(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  //! -------------------------- search ---------------------------------------- !
  // to see 
  const handleSearchedItemChange = (e) => {
    setSearchedItem(e.target.value);
    setStateOptionChecked({
      fragile: false,
      heavy: false,
      floor: false,
    });  
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {searchedItem};
    console.log("CB data.searchedItem", data.searchedItem);
    axios.get(`http://localhost:5050/api/move/${props.location.state.id}/boxes/searchedItem/${data.searchedItem}`)
          .then(res => {
            setBoxes(res.data);
            console.log("CB res :",res);
          }).catch(err => {
            console.log(err);
          });
  };
  //! -------------------------------------------------------------------------- !
  

  // --------- CB : to display all the boxes ----------
  const displayAllBoxes = () => {
    axios.get(`http://localhost:5050/api/move/${props.location.state.id}/boxes`)
    .then(res => {
      setBoxes(res.data);
      setSearchedItem("");
      console.log("CB res display all boxes:",res);
    })
    .catch(err => {
      console.log(err);
    });
  };
  // --------- end display all the boxes --------------

  const handleDelete = (props) => {
    console.log('cliqué, props', props);
    const id = props.selectedId;
    console.log('id : ', id);
    axios.delete(`http://localhost:5050/api/box/${id}`)
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
  };
  return (
    <div className={classes.root}>
      <Header />
      <Container component="main" > 
        {/* <CssBaseline /> */}
        <div className={classes.paper}>
          <Icon className="fas fa-box-open" color="secondary" style={{ fontSize: 30, width: 45 }}/>
          <Typography component="h1" variant="h4"  className={classes.title}>
            Listes des cartons de mon déménagement
          </Typography>
          <Card className={classes.card}>
            <CardContent>
              <form noValidate autoComplete="on" onSubmit={handleSubmit} >
                <Typography component="h1" variant="h5" className={classes.title}>
                  <TextField id="outlined-basic" label="Objet à rechercher" variant="outlined" value={searchedItem}  onClick={() => setSearchedItem('')} onChange={handleSearchedItemChange} style={{borderRadius: '11px', background: '#ffffff', boxShadow:  '4px 4px 7px #d9d9d9, -4px -4px 7px #ffffff'}}/>
                  <Tooltip title="Lancer la recherche" aria-label="Search" style={{marginLeft:'-25px',}}>
                    <Fab type="submit" color="secondary" className={classes.submit}>
                      <SearchIcon />
                    </Fab>
                  </Tooltip>
                </Typography>
              </form>
              {/* CB : dysplay all the boxes */}
              <ButtonCustom
                type="submit"
                fullWidth
                variant="contained"
                onClick={() => {displayAllBoxes()} }
                color="secondary"
              >
                Annuler la recherche
              </ButtonCustom>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <div className={classes.title} >
                <Typography variant="h5"  className={classes.title}>
                   Je ne veux séléctionner que les cartons :
                </Typography>
                <FormGroup row style={{ display: "flex", justifyContent: "center" }}>
                  <FormControlLabel
                    control={
                    <Checkbox checked={stateOptionChecked.fragile} onChange={handleChange} name="fragile" />} //onChange={handleChange
                    label="Fragile"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={stateOptionChecked.heavy} onChange={handleChange} name="heavy" />}
                    label="Lourd"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={stateOptionChecked.floor} onChange={handleChange} name="floor" />}
                    label="A l'étage"
                  />
                </FormGroup>
              </div>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h5"  className={classes.title}>
                Cliquer sur les boîtes ci-dessous représentant un carton pour consulter ou ajouter du contenu.
              </Typography>
              
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
            <Link to ={{
                  pathname:"/create-box",
                  state: {
                    id: props.location.state.id,
                  }
              }} style={{ display: "flex", justifyContent: "center" }}>
                <Typography component="h1" variant="h5" className={classes.title}>
                  <Tooltip title="Ajouter un carton" aria-label="Add">
                    <Fab color="primary" className={classes.fab}>
                      <AddIcon />
                    </Fab>
                  </Tooltip>
                  <Button size="medium" variant="outlined" color="secondary" style={{marginLeft: '15px'}}>Ajouter un carton</Button>
                </Typography>
              </Link>
            </CardContent>
          </Card>
          
          {/* ------------- CB new interface of box ---------------- */}
          <Grid container justify="space-around">
            {filteredItems.map(boxe => 
              <Grid 
                item  
                key={boxe.id} 
                xs={12} 
                sm={6}
                md={4}
              >
                <Grid container
                  direction="column"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item xs={12} style={{ width: "inherit" }}>
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
                      <Grid item xs={12} 
                        container
                        direction="column"
                        justify="space-between"
                        alignItems="center"
                        className={classes.boxLi}
                      >
                        <Grid item xs={12}>
                          <Paper className={classes.titleBox}>
                            <Typography>
                              {boxe.label} 
                            </Typography>
                          </Paper>
                        </Grid>
                          
                        <Grid item xs={12}
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                          >
                            
                            <Grid item xs={4} sm={3}
                              container
                              direction="column"
                              justify="center"
                              alignItems="center"                            
                            >
                              <div>  
                                <Grid item xs={12}>
                                <Icon className="fas fa-box-open" color="secondary" style={{ fontSize: 50, width: 70 }}/>
                                </Grid>
                                
                                <Grid item xs={12}>
                                  <Typography className={classes.nbrBox}> {deleteZero(boxe.code) } 
                                  </Typography>
                                </Grid>                            
                              </div>
                            </Grid>                 
                            <Grid item xs={8} sm={9}
                              container
                              direction="row"
                              justify="center"
                              alignItems="center"
                              className={classes.justifyContentSpaceBetween}                            
                            >
                              <Grid item xs={12}
                                container
                                direction="row"
                                className={classes.bgPrimary}
                                alignItems="center" 
                                style={{margin: '10px 0 10px 0'}}  
                              >
                                <Grid item xs={2}>
                                  <LocationOnIcon color="secondary" fontSize="large" />
                                </Grid>
                                <Grid item xs={9}>
                                  <Typography color="secondary" className={classes.textLeft}> {boxe.destination_room}</Typography>
                                </Grid>
                              </Grid>
                              <Grid item xs={10}
                                container
                                direction="row"                              
                                alignItems="center"
                                className={classes.justifyContentSpaceBetween} 
                                                            
                              >
                              
                                {(() => {
                                if (boxe.heavy===true) {
                                  return (
                                    <Grid item xs={3}                                
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                    >
                                      <Grid item xs={10}>
                                        <Icon className="fas fa-weight-hanging" color="secondary" />
                                      </Grid>
                                      <Grid item xs={10}>
                                        <Typography>
                                          Lourd 
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  )
                                }
                                })()} 
                                {(() => {
                                  if (boxe.floor===true) {
                                    return (
                                      <Grid item xs={3}                                
                                      container
                                      direction="column"
                                      justify="center"
                                      alignItems="center"
                                      >
                                          <Grid item xs={10}>
                                          <Icon className="fas fa-level-up-alt" color="secondary" />
                                          </Grid>
                                          <Grid item xs={10}>
                                            <Typography>
                                              Etage 
                                            </Typography>
                                          </Grid>
                                      </Grid>
                                    )
                                  }
                                })()}
                                {(() => {
                                  if (boxe.fragile===true) {
                                    return (
                                      <Grid item xs={3}                                
                                      container
                                      direction="column"
                                      justify="center"
                                      alignItems="center"
                                      >
                                          <Grid item xs={10}>
                                          <Icon className="fas fa-wine-glass" color="secondary" />
                                          </Grid>
                                          <Grid item xs={10}>
                                            <Typography>
                                            Fragile 
                                            </Typography>
                                          </Grid>
                                      </Grid>
                                    )
                                  }
                                })()} 
                              </Grid>
                                    
                            </Grid>
                          </Grid>
                      </Grid>  
                        
                      </Button>
                    </Link>
                  </Grid> 
                  <Grid item xs={12}>   
                    <DeleteIcon fontSize="large" color="secondary" onClick={() => {handleClickOpen(boxe.id)}}/>
                    </Grid>   
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
                </Grid>
              </Grid>
            )}
          </Grid>
          {/*  -----------------end CB ---------------------- */}
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default withRoot(BoxesByMove);
