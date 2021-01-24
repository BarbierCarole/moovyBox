// To view all the task by selected move
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Avatar from '@material-ui/core/Avatar';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Button from '@material-ui/core/Button';
// import QueueIcon from '@material-ui/icons/Queue';
// // for the icon fontasome
// import { loadCSS } from 'fg-loadcss'; // for th icons
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import useStyles from './styles/styles';
import Container from '@material-ui/core/Container';
import withRoot from '../modules/withRoot';
import Footer from '../modules/views/Footer';
import Header from '../modules/views/Header';
import TextField from '@material-ui/core/TextField';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
// to redirection signin
import { useSelector } from 'react-redux';
import { Redirect} from 'react-router';
import { toast } from 'react-toastify';
import GoBack from '../modules/components/GoBack'; 
// for the checkbox
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

axios.defaults.withCredentials = true;

// toast.configure();

const Task = (props) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
 
  const classes = useStyles();
  
  const [task, setTask] = useState([]);
  const [checked, setChecked] = useState(true);
  
  const [move_id, setMoveId] = useState(props.location.state.id);
  const [getTask, setGetTask] = useState(false);

  const isLogged = useSelector((state) => state.isLogged);

  if (!isLogged) {
    console.log('isLogged',isLogged);
    //console.log('email,password page App/index',email,password);
    return <Redirect to="/signin" />;
  };
  
  useEffect(() => {
    axios.get(BASE_URL+`/api/move/${props.location.state.id}/tasks`)
      .then(res => {
        setTask(res.data);
        console.log(">> res.data :",res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [getTask]);


  return (
      <div className={classes.root}>
          <Header />
          <Container component="main" maxWidth="xs">
          <Typography component="p" variant="h5">
              <GoBack /> Retour à la page précédente 
          </Typography>
        
          <div className={classes.paper}>
          
          <Typography component="h1" variant="h4">
              Checklist du déménagement
          </Typography>
          <Typography component="h1" variant="h3">
              {props.location.state.label}
          </Typography>
          {/* new button */}   
          
              {/* { task.map(task =>
              
                <li key={task.id}>
                  <Checkbox checked={checked} onChange={checkChanged} />                  
                  
                  <Typography component="p" variant="h5">
                  
                     - {task.date}
                    
                  </Typography>
                </li>)
              } */}
              


              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">
                      <input
                        type="checkbox"
                        onChange={e => {
                          let checked = e.target.checked;
                          setTask(
                            task.map(d => {
                              d.checked = checked;
                              return d;
                            })
                          );
                        }}
                      ></input>
                    </th>
                    <th scope="col">Taches</th>
                  </tr>
                </thead>
                <tbody>
                  {task.map((d, i) => (
                    <tr key={d.id}>
                      <th scope="row">
                        <input
                          onChange={event => {
                            let checked = event.target.checked;
                            setTask(
                              task.map(data => {
                                if (d.id === data.id) {
                                  data.checked = checked;
                                }
                                return data;
                              })
                            );
                          }}
                          type="checkbox"
                          checked={d.checked}
                        ></input>
                      </th>
                      <td>{d.label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
          </Container>
          <Footer />
      </div>
  )
}

export default withRoot(Task);
