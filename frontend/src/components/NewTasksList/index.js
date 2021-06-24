// To view all the task by selected move
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import withRoot from '../modules/withRoot';

// to redirection signin
import { useSelector } from 'react-redux';
import { Redirect} from 'react-router';

axios.defaults.withCredentials = true;

const NewTasksList = (props) => { // props : location.state.id:19 et location.state.label:"Caraibes"
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [moveId, setMoveId] = useState( props.location.state.id );
  console.log("l.32moveId >> ", moveId);

  const [tasks, setTasks] = useState([]); // toutes les taches grace à useEffect setTasks(res.data); 
  console.log(">> tasks l.32", tasks);
  const isLogged = useSelector((state) => state.isLogged);
  console.log("State of isLogged : ",isLogged);
  if (!isLogged) {
    console.log('isLogged',isLogged);
    return <Redirect to="/signin" />;
  };

  useEffect(() => {
    // on va créer la liste directement
    console.log(">> l.31 props : ",props);
    axios.post(BASE_URL+`/api/move/${props.location.state.id}/NewTasksList`)
      .then(res => { })
      .catch(err => {
        console.log(err);
      });
  }, []); //  [] pour que ça ne boucle pas

  return ( 
    <div>
      <Redirect to ={{
        pathname:`/move/${props.location.state.id}/tasksList`,
        state: {
        moveId: props.location.state.id,   
        id: props.location.state.id,                     
        }
      }} />
    </div>
  );   
  
}

export default withRoot(NewTasksList);
