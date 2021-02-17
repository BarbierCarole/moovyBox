// To view all the task by selected move
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Typography from '@material-ui/core/Typography';
import useStyles from './styles/styles';
import withRoot from '../modules/withRoot';
import Footer from '../modules/views/Footer';
import Header from '../modules/views/Header';

// to redirection signin
import { useSelector } from 'react-redux';
import { Redirect} from 'react-router';
import {Link} from "react-router-dom";

//to display in a card
import {Card, CardHeader, CardContent, Checkbox } from '@material-ui/core';


import IconButton from '@material-ui/core/IconButton';

import { add, addDays, parseISO, format } from 'date-fns';


axios.defaults.withCredentials = true;

const Task = (props) => { // props : location.state.id:19 et location.state.label:"Caraibes"
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  console.log('>>l.28 props : ',props);

  const classes = useStyles();
  const isLogged = useSelector((state) => state.isLogged);
  console.log("State of isLogged : ",isLogged);
  if (!isLogged) {
    console.log('isLogged',isLogged);
    //console.log('email,password page App/index',email,password);
    return <Redirect to="/signin" />;
  };

  const [task, setTask] = useState('');
  console.log(">> l.41 task:",task);
  // Pour calculer la date d'action par rapport à la date du déménagement et au nbre de jours avant ou après
  const dayCalcT= (date,day) => {
    const result = addDays(parseISO(date), day);
    console.log(">>dayCalc",result);
    return result;
  }

  useEffect(() => {
    console.log(">> l.49 props.location.state.id et props.match.params.id : ",props.location.state.id,props.match.params.id);
    axios.get(BASE_URL+`/api/move/${props.match.params.id}/task/${props.location.state.id}`)
      .then(res => {
        setTask(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []); //  [] pour que ça ne boucle pas

  

  return (

    <div className={classes.root}>
        <Header />
        <Typography>
          {task.label}<br/>{task.description}
        </Typography>  
        
        <Footer />
    </div>  

  )
}

export default withRoot(Task);
