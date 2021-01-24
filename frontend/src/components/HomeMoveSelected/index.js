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
import { useLocation } from "react-router-dom";
  

toast.configure();

const HomeMoveSelected = () => {

    
    const isLogged = useSelector((state) => state.isLogged);
    console.log("State of isLogged : ",isLogged);
    const classes = useStyles();
    // test
    const location = useLocation();
    console.log(">> location", location.state.id,location.state.label);
   

    return (
        <div className={classes.root}>
        <Header />
            {/* <Container component="main" >  */}
                {/* <CssBaseline /> */}
                <div className={classes.paper}>
                    <Icon className="fas fa-box-open" color="secondary" style={{ fontSize: 30, width: 45 }}/>
                    <Typography component="h1" variant="h4"  className={classes.title}>
                    Déménagement : {location.state.label}
                    </Typography>
                    <Grid container>
                        <Grid item xs={12} md={4}>
                            <Link to={{
                                // pathname:"/move/"+move.id,
                                pathname:`/move/${location.state.id}`,
                                state: {
                                id: location.state.id,
                                label: location.state.label,
                                }
                            }}>
                                <Typography>Mes cartons du déménagement</Typography>
                            </Link>
                            
                        </Grid>
                        <Grid item xs={12} md={4} >
                            <Link to={{
                                // pathname:"/move/"+move.id,
                                pathname:`/move/${location.state.id}/research`,
                                state: {
                                id: location.state.id,
                                label: location.state.label,
                                }
                            }}>
                                <Typography>Rechercher dans mes cartons<br/>{location.state.label}</Typography>
                            </Link>
                            
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Link to={{
                                // pathname:"/move/"+move.id,
                                pathname:`/move/${location.state.id}/task`,
                                state: {
                                id: location.state.id,
                                label: location.state.label,
                                }
                            }}>
                                <Typography>Ma checklist</Typography>
                            </Link>
                            
                        </Grid>
                    </Grid>
                </div>
            {/* </Container> */}
        </div>    
            
    );
};

export default withRoot(HomeMoveSelected);