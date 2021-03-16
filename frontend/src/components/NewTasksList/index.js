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

import GoBack from '../modules/components/GoBack'; 
import { Checkbox } from '@material-ui/core';

import Icon from '@material-ui/core/Icon';
//to display in a card
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

axios.defaults.withCredentials = true;

const NewTasksList = (props) => { // props : location.state.id:19 et location.state.label:"Caraibes"
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // console.log(">> props boulet", props); 
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

  useEffect(() => {
    // on va créer la liste directement
    console.log(">> l.31 props : ",props);
    axios.post(BASE_URL+`/api/move/${props.location.state.id}/NewTasksList`)
      .then(res => {
        window.history.back();
      })
      .catch(err => {
        console.log(err);
      });
  }, []); //  [] pour que ça ne boucle pas

  useEffect(() => {
    // on affiche la liste des tâches 
    console.log(">> l.31 props : ",props);
    if (!tasks) {
      return "";
    }
    axios.get(BASE_URL+`/api/move/${props.location.state.id}/tasksList`)
      .then(res => {
        console.log(res.data);
        setTasks(res.data);  
      })
      .catch(err => {
        console.log(err);
      });
  }, []); //  [] pour que ça ne boucle pas

    const handleChange = (e) => {
      console.log(">> l.43 e :", e.target.value);
      console.log(">> l.44 e :", e.target.checked);
      const t = tasks.map((v) => ({

        id: v.id,
        label: v.label,
        move_id: props.location.state.id,
        is_realised: (e.target.value == v.id ) ? e.target.checked : v.is_realised,
        
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
      <Container component="main" > 
        {/* <CssBaseline /> */}
        <div className={classes.paper}>
          <Icon className="fas fa-box-open" color="secondary" style={{ fontSize: 30, width: 45 }}/>
          <Typography component="h1" variant="h4"  className={classes.title}>
            Ma checklist
          </Typography>
          
          {/* ↓ research ↓ */}
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
        </div>
      </Container>
      <Footer />
    </div>
  )
    
}

export default withRoot(NewTasksList);
