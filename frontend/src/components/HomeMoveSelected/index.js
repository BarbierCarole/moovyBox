import React, {useState, useEffect} from 'react';
import withRoot from '../modules/withRoot';
import Header from '../modules/views/Header';
import Typography from '@material-ui/core/Typography';
import {BrowserRouter as Router, Link} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
// for the icon fontasome
import Icon from '@material-ui/core/Icon';
// to confirm
// to redirection signin
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// search
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