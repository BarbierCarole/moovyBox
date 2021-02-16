// To view all the task by selected move
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Typography from '@material-ui/core/Typography';
import useStyles from './styles/styles';
import Container from '@material-ui/core/Container';
import withRoot from '../modules/withRoot';
import Footer from '../modules/views/Footer';
import Header from '../modules/views/Header';

// to redirection signin
import { useSelector } from 'react-redux';
import { Redirect} from 'react-router';

import { Checkbox } from '@material-ui/core';

import Icon from '@material-ui/core/Icon';
//to display in a card
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

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

 //! reprendre ici
  // const dayCalc = (difDay, date) => {
  //   console.log(">> 55 data.nber_days, data.date",difDay,date);
  //   // const result = add(new Date(date),{days: 5 });
  //   const result = difDay + ' et ' + date;
  //   return result; 

  // };

  const dayCalcT= (date,day) => {
    const result = addDays(parseISO(date), day);
    console.log(">>dayCalc",result);
    
    return result;
  }


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
        
        
        {/* <Container component="main" > 
          
          <div className={classes.paper}>
            <Icon className="fas fa-box-open" color="secondary" style={{ fontSize: 30, width: 45 }}/>
            <Typography component="h1" variant="h4"  className={classes.title}>
              Ma checklist
            </Typography>
            <Card className={classes.card}>
              <CardContent>
                <table className="table table-bordered"> 
                  <tbody>
                      {tasks.map((data,i) => (
                        <tr key={i}>
                          <th scope="row">              
                          <Checkbox color="primary" checked={data.is_realised} value={data.id} onChange={handleChange} /> 
                          </th>
                          <td>{data.label}</td>
                        </tr>
                        
                      ))}     
                    </tbody>
                  </table>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardContent>
              <Typography component="h1" variant="h4"  className={classes.title}>
                XX Action(s) en attente
              </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardContent>
              <Typography component="h1" variant="h4"  className={classes.title}>
                XX action(s) à venir
              </Typography>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardContent>
              <Typography component="h1" variant="h4"  className={classes.title}>
                XX Action(s) accomplie
              </Typography>
              </CardContent>
            </Card>
          </div>
        </Container> */}
        <div>
        {tasks.map((data,i) => (
          <div key={i}>
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
              
            </Card>
            
          </div>  
          
        ))}
          
        </div>
        
        <Footer />
    </div>  

  )
}

export default withRoot(TasksList);
