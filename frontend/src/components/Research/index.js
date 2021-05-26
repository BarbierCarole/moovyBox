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
import useStyles from './styles/styles';

toast.configure();

const Research = (props) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const isLogged = useSelector((state) => state.isLogged);
  console.log("State of isLogged : ",isLogged);
  const classes = useStyles();
  
  const [boxes, setBoxes] = useState([]);
    // To confirm
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState();
  // for the research
  const [searchedItem, setSearchedItem] = useState("");
  // -- filter fragile, heavy or floor
  const [filteredItems, setFilteredItems] = useState([]);
  
  const [stateOptionChecked, setStateOptionChecked] = useState({
    fragile: false,
    heavy: false,
    floor: false,
  });
  // to display the boxes with checkbox checked or not
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
    console.log("CB event et stateOptionChecked ",event, stateOptionChecked);
  };  

  const successDelete = () => {
    toast.success('Votre carton a bien été supprimé !', {
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
    axios.get(BASE_URL+`/api/move/${props.location.state.id}/boxes`)
    .then(res => {
      setBoxes(res.data);
    })
    .catch(err => {
      console.log(err);
    });
    console.log("/${CB : props.location.state.label}",props.location.state.label)
  }, []);

  //! -------------------------- search ---------------------------------------- !
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
    axios.get(BASE_URL+`/api/move/${props.location.state.id}/boxes/searchedItem/${data.searchedItem}`)
          .then(res => {
            setBoxes(res.data);
            console.log("CB  response of server : ",res);
            console.log("the URL of research in backend is :",BASE_URL+"/api/move/"+props.location.state.id+"/boxes/searchedItem/"+data.searchedItem);
          }).catch(err => {
            console.log(err);
          });
  };
  //! -------------------------------------------------------------------------- !
  

  // --------- CB : to display all the boxes ----------
  const displayAllBoxes = () => {
    axios.get(BASE_URL+`/api/move/${props.location.state.id}/boxes`)
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
    axios.delete(BASE_URL+`/api/box/${id}`)
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
            Rechercher dans le déménagement "{props.location.state.label}"
          </Typography>
          
          {/* ↓ research ↓ */}
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
              {/* CB : display all the boxes */}
              <ButtonCustom
                type="submit"
                fullWidth
                variant="contained"
                onClick={() => {displayAllBoxes()} }
                color="secondary"
              >
                Annuler la recherche<br/>et tout afficher
              </ButtonCustom>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <div className={classes.title} >
                <Typography variant="h5"  className={classes.title}>
                   Je ne veux sélectionner que les cartons :
                </Typography>
                <FormGroup row style={{ display: "flex", justifyContent: "center" }}>
                  <FormControlLabel
                    control={
                    <Checkbox checked={stateOptionChecked.fragile} onChange={handleChange} name="fragile" />} 
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
                        id: boxe.id,
                        label: boxe.label,
                        code:boxe.code
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

export default withRoot(Research);
