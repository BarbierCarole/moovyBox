import React, {useState, useEffect} from 'react';
import axios from 'axios';
import withRoot from '../modules/withRoot';
import Header from '../modules/views/Header';
import Footer from '../modules/views/Footer';
import Typography from '@material-ui/core/Typography';
import {BrowserRouter as Router, Link} from "react-router-dom";

// for the icon fontasome
import {Icon, Button, Fab, Tooltip} from '@material-ui/core';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SearchIcon from '@material-ui/icons/Search';
import UnarchiveIcon from '@material-ui/icons/Unarchive';
// to confirm
// to redirection signin
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
// search
import useStyles from './styles/styles';
import { useLocation } from "react-router-dom";
  

toast.configure();

const HomeMoveSelected = () => {

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const isLogged = useSelector((state) => state.isLogged);
    console.log("State of isLogged : ",isLogged);
    const classes = useStyles();
    // test
    const location = useLocation();
    console.log(">> location", location.state.id,location.state.label);
    const [message, setMessage] = useState('');
    const [endUrl, setEndUrl] = useState('');
    console.log(">> message et endUrl :", message, endUrl);

    useEffect(() => {
        axios.get(BASE_URL+`/api/move/${location.state.id}/tasksList`) // api/move/:moveId/tasksList
          .then(res => {

            if (!res.data.length) {
                setEndUrl("newTasksList");
                setMessage("Je crée ma checkList !");                
            } else { 
                setEndUrl("tasksList");
                setMessage("J'accède à ma checklist");               
            }
          })
          .catch(err => {
            console.log(err);
          })
      }, []);

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
                    <div className={classes.content}>
                        {/* ↓ lien consulter mes cartons ↓ */}
                        <Link to ={{
                            pathname:`/move/${location.state.id}`,
                                state: {
                                id: location.state.id,
                                label: location.state.label,
                                }
                        }} style={{ display: "flex", justifyContent: "left"}}>
                            <Typography component="h1" variant="h5" className={classes.title}>
                            <Tooltip title="Consulter mes cartons" aria-label="Add">
                                <Fab color="primary" className={classes.fab}>
                                <UnarchiveIcon />
                                </Fab>
                            </Tooltip>
                            <Button size="medium" variant="outlined" color="secondary" className={classes.button}>Créer ou consulter mes cartons</Button>
                            </Typography>
                        </Link>
                        
                        <Link to ={{
                            pathname:`/move/${location.state.id}`,
                                state: {
                                id: location.state.id,
                                label: location.state.label,
                                }
                            }} style={{ display: "flex", justifyContent: "left" }}>
                            <Typography component="h1" variant="h5" className={classes.title}>
                                <Tooltip title="Je veux rechercher un objet" aria-label="Add">
                                    <Fab color="primary" className={classes.fab}>
                                    <SearchIcon />
                                    </Fab>
                                </Tooltip>
                            <Button size="medium" variant="outlined" color="secondary" className={classes.button}> Rechercher dans mes cartons</Button>
                            </Typography>
                        </Link>
                                                
                        <Link to ={{
                            pathname:`/move/${location.state.id}/${endUrl}`,
                                state: {
                                    id: location.state.id,
                                    label: location.state.label,
                                }
                        }} className={classes.link} >
                            <Typography component="h1" variant="h5" className={classes.title}>
                            <Tooltip title="Je crée ou je regarde ma checklist" aria-label="Add">
                                <Fab color="primary" className={classes.fab}>
                                <ListAltIcon />
                                </Fab>
                            </Tooltip>
                            <Button size="medium" variant="outlined" color="secondary" className={classes.button} >{message}</Button>
                            </Typography>
                        </Link>
                    </div>
                        
                </div>
            {/* </Container> */}
            <Footer />
        </div>    
            
    );
};

export default withRoot(HomeMoveSelected);