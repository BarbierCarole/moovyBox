
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


import { makeStyles } from '@material-ui/core/styles';


//to display in a card
import {Card, CardHeader, CardContent, Avatar } from '@material-ui/core';


import IconButton from '@material-ui/core/IconButton';

import { add, addDays, parseISO, format, toDate, } from 'date-fns';
import { frFR } from 'date-fns/locale';
import { addYears, formatWithOptions } from 'date-fns/fp';


axios.defaults.withCredentials = true;

const Task = (props) => { // props : location.state.id:19 et location.state.label:"Caraibes"

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  console.log('>>l.28 props : ',props);

  const classes = useStyles();
 
  const [task, setTask] = useState('');
 
  const isLogged = useSelector((state) => state.isLogged);
  console.log("State of isLogged : ",isLogged);
  if (!isLogged) {
    console.log('isLogged',isLogged);
    //console.log('email,password page App/index',email,password);
    return <Redirect to="/signin" />;
  };

    
  const dayCalcT= (date,day) => {
    // if (!date)... sert pour l'erreur "invalide value" car serveur n'a encore rien envoyé quand fonction lancée. Pourquoi ?...
    if (!date) {
      return "";
    }

    const result = addDays(parseISO(date), day);    
    return format(result,'dd/MM/yyyy');    
  }

  useEffect(() => {
   axios.get(BASE_URL+`/api/move/${props.match.params.id}/task/${props.location.state.id}`)
    .then(res => {
      setTask(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  }, []); //  [] pour que ça ne boucle pas

 // ################### 
 // test date
 // Pour calculer la date d'action par rapport à la date du déménagement et au nbre de jours avant ou après
 
  
  // ############# fin test
  return (

    <div className={classes.root}>
        <Header />
        <Card className={classes.card}>
          
          <CardContent>
            
            <Typography variant="h4" component="h1" gutterBottom>
             
              {task.label}<br/>
              {dayCalcT(task.date, task.nber_days)}
            </Typography>       
        
            <Typography variant="body2" component="p" className={classes.typography}>
              {task.description}   
            </Typography>
          </CardContent>
        </Card> 
        
        <Footer />
    </div>  

  )
}

export default withRoot(Task);
