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
// for the checkbox

axios.defaults.withCredentials = true;

const TasksList = (props) => { // props : location.state.id:19 et location.state.label:"Caraibes"
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const isLogged = useSelector((state) => state.isLogged);
  console.log("State of isLogged : ",isLogged);

  // console.log(">> props boulet", props); 
  const classes = useStyles();

  const [tasks, setTasks] = useState([]); // toutes les taches grace à useEffect setTasks(res.data); 
  console.log(">> tasks l.32", tasks);

  if (!isLogged) {
    console.log('isLogged',isLogged);
    //console.log('email,password page App/index',email,password);
    return <Redirect to="/signin" />;
  };

  useEffect(() => {
    console.log(">> l.31 props : ",props);
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
 
  // const handleChangePut = (props) => {
  //   console.log(">> l.54 props :", props);
  //   // const id = props.id;
  //   // const label = props.label;
  //   // const date = props.date;
  //   // const note= props.note;
  //   // const contact= props.contact;
  //   // const user_id= props.user_id;
  //   // const move_id = props.move_id;
      
  //   // const data = {label, date, note,contact, user_id, move_id, checked};
  //   // axios.put(BASE_URL+`/api/move/${move_id}/task/${id}`, data)
  //   //     .then(res => {console.log(">< bien envoyé");})
  //   //     .catch(err => {
  //   //       console.log(err);
  //   //     })
  // }


  return (
    <div className={classes.root}>
      <table className="table table-bordered"> 
      <tbody>
          {tasks.map((data,i) => (
            <tr key={i}>
              <th scope="row">              
              <Checkbox color="primary" checked={data.is_realised} value={data.id} onChange={handleChange} /> 
                {/* handleChangePut(props)
                <Checkbox
                  checked={data.checked}
                  onChange={handleChange(data)                            
                  }
                /> */}
              </th>
              <td>{data.label}</td>
            </tr>
          ))}     
        </tbody>
      </table>
      
    </div>
  )
}

export default withRoot(TasksList);
