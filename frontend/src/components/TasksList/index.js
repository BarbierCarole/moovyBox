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
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import IconButton from '@material-ui/core/IconButton';

import { add, addDays, parseISO, format } from 'date-fns';


axios.defaults.withCredentials = true;

const TasksList = (props) => { // props : location.state.id:19 et location.state.label:"Caraibes"
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  console.log('>>l.28 props : ',props);

  const classes = useStyles();

  const [tasks, setTasks] = useState([]); // toutes les taches grace à useEffect setTasks(res.data); 
  console.log(">> tasks l.32", tasks);


  const isLogged = useSelector((state) => state.isLogged);
  console.log("State of isLogged : ",isLogged);
  if (!isLogged) {
    console.log('isLogged',isLogged);
    //console.log('email,password page App/index',email,password);
    return <Redirect to="/signin" />;
  };

  // Pour calculer la date d'action par rapport à la date du déménagement et au nbre de jours avant ou après
  const dayCalcT= (date,day) => {
    const result = addDays(parseISO(date), day);
    console.log(">>dayCalc",result);
    
    return result;
  }

  // pour afficher déplié le premier accordéon
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChangePanel = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    console.log(">> l.31 props : ",props);
    axios.get(BASE_URL+`/api/move/${props.location.state.id}/tasksList`)
      .then(res => {
        setTasks(res.data); 
        
        console.log(">> l.46 tasks",tasks);
        
      })
      .catch(err => {
        console.log(err);
      });
  }, []); //  [] pour que ça ne boucle pas

  const handleChange = (e) => {
    console.log(">> l.43 e :", e.target.value);
    console.log(">> l.44 e :", e.target.checked);
    const t = tasks.map((v) => (
      {
      id: v.id,
      label: v.label,
      move_id: props.location.state.id,
      is_realised: (e.target.value == v.id ) ? e.target.checked : v.is_realised,
      date: v.date,
      nber_days: v.nber_days,
    }));
    
    setTasks(t);
        
    const data = {
      task_id: e.target.value,
      move_id: props.location.state.id,      
      //is_realised: tasks.is_realised,
      is_realised: e.target.checked,
    }

    console.log(">> l.71 data", data);   
    axios.put(BASE_URL+`/api/move/${props.location.state.id}/tasksList/${e.target.value}`, data)
        .then(res => {
          console.log(">< bien envoyé");
        })
        .catch(err => {
          console.log(err);
        })
  }

  return (

    <div className={classes.root}>
        <Header />
          <Accordion square expanded={expanded === 'panel1'} onChange={handleChangePanel('panel1')} className={classes.accordion}>
            <AccordionSummary 
              className={classes.accordionSummary}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography component="h1" variant="h4"  className={classes.title}>
                Mes tâches à réaliser
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              {tasks.map((data,i) => (
                (!data.is_realised ? (
                  <Card className={classes.root} key={i}>
                    <CardHeader
                      avatar={
                        <Checkbox color="primary" checked={data.is_realised} value={data.id} onChange={handleChange} />
                      }
                      action={
                        <IconButton aria-label="settings">
                        </IconButton>
                      }
                      title={
                        // data.label
                        <Link to ={{
                            pathname:`/move/${data.move_id}/task/${data.id}`,
                                state: {
                                id: data.id,
                                label: data.label,                                
                                }
                        }} >
                            <Typography component="h1" variant="h5" className={classes.title}>
                              {data.label}
                            </Typography>
                        </Link>                        
                      }
                      subheader={format(dayCalcT(data.date,data.nber_days),'dd/MM/yyyy')}
                    />
                  </Card>) : console.log("tache true"))
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion square expanded={expanded === 'panel2'} onChange={handleChangePanel('panel2')} className={classes.accordion}>
            <AccordionSummary 
              className={classes.accordionSummary}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography component="h1" variant="h4"  className={classes.title}>
                Mes tâches accomplies
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              {tasks.map((data,i) => (
                (data.is_realised >0 ? (
                  <Card className={classes.root} key={i}>
                  <CardHeader
                      avatar={
                        <Checkbox color="primary" checked={data.is_realised} value={data.id} onChange={handleChange} />
                      }
                      action={
                        <IconButton aria-label="settings">
                        </IconButton>
                      }
                      title={data.label}
                      subheader={format(dayCalcT(data.date,data.nber_days),'dd/MM/yyyy')}                      
                    />
                  </Card>) : console.log("tache true"))
              ))}
            </AccordionDetails>
          </Accordion>
        
        <Footer />
    </div>  

  )
}

export default withRoot(TasksList);
