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

import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
//to display in a card
import {Card, CardContent } from '@material-ui/core';
// bouton correction


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import ButtonCustom from '../modules/components/Button';

import { addDays, parseISO, format } from 'date-fns';

axios.defaults.withCredentials = true;

const Task = (props) => { // props : location.state.id:19 et location.state.label:"Caraibes"
    const taskId = props.match.params.taskId;
    const id = props.match.params.id;
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  console.log('>>l.28 props id, taskId : ',id, taskId);

  const classes = useStyles();
  // For button modify
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState('');
  console.log(">> l.46 task : ", task);
  // const [selectedId, setSelectedId] = useState();
 
  const isLogged = useSelector((state) => state.isLogged);
  console.log("State of isLogged : ",isLogged);
  if (!isLogged) {
    console.log('isLogged',isLogged);
    //console.log('email,password page App/index',email,password);
    return <Redirect to="/signin" />;
  };

  const goBack= () =>{
    window.history.back();
  }

  const handleDelete = () => {
    console.log('id et taskId: ', id, taskId);
    axios.delete(BASE_URL+`/api/move/${id}/tasksList/${taskId}`)
        .then(res => {
          setOpen(false);
          goBack();
        }).catch(err => {
          console.log(err);
        })
  };

  const handleCloseDel = () => {
    setOpen(false);
  };

  const handleClickOpenDel = (value) => {
    setOpen(true);
  };

  const dayCalcT= (date,day) => {
    if (task.general_task) {
        // if (!date)... sert pour l'erreur "invalide value" car serveur n'a encore rien envoyé quand fonction lancée. Pourquoi ?...
      if (!date) {
        return "";
      }
      console.log(">> date et day", date, day);
      const result = addDays(parseISO(date), day);    
      return format(result,'dd/MM/yyyy');
     
      } else {
        if (!task.date_perso) {
          return "";
        }
        const goodDate = new Date(task.date_perso);
        console.log('l.96 >> goodDate', goodDate)
        return format(goodDate,'dd/MM/yyyy');
      } 
        
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

  
  return (
    <div className={classes.root}>
        <Header />
        <Card className={classes.card}>
          <CardContent>
          <Grid container spacing={0}>
            <Grid item xs={10}> 
              <Typography variant="h4" component="h1" gutterBottom className={classes.title}>            
                {task.label}<br/>
                {dayCalcT(task.date, task.nber_days)}
              </Typography>   
            </Grid>
             
            { !task.general_task ? (            
              
              <Grid item xs={1}>   
              <IconButton aria-label="update">
                <Link to ={{
                  // pathname:"/move/"+move.id,
                  pathname:`/move/${id}/task/${taskId}/modify`,
                  state: {
                    id: id,
                    taskId: taskId,
                    label: task.label,
                    note: task.note,
                    description: task.description,
                    contact: task.contact,
                    date_perso: task.date_perso,
                    is_realised: task.is_realised
                  }
                }}>
                  <CreateIcon size="medium" color="secondary" />
                </Link>

              </IconButton>
              </Grid>) : null
            }
            <Grid item xs={1}> 
              <IconButton aria-label="delete" onClick={() => {handleClickOpenDel(task.id)}}>
                <DeleteForeverIcon size="medium" color="secondary" />
              </IconButton>  
            </Grid>
            <Grid item xs={12}> 
              <Typography variant="h4" component="h3" className={classes.typography}>
                Description  
              </Typography>
              <Typography variant="body2" component="p" className={classes.typography}>
                {task.description}   
              </Typography>
            </Grid>
            <Grid item xs={12}> 
              <Typography variant="h4" component="h3" className={classes.typography}>
                Mes notes  
              </Typography>
              <Typography variant="body2" component="p" className={classes.typography}>
                {task.note}   
              </Typography>
            </Grid>
            <Grid item xs={12}> 
              
              <Typography variant="h4" component="h3" className={classes.typography}>
                Mes contacts  
              </Typography>
              
              <Typography variant="body2" component="p" className={classes.typography}>
                {task.contact}   
              </Typography>
            </Grid>
            
          </Grid>
          </CardContent>
        </Card> 

        {/*----------  popup modale de confirmation  -------- */}
          
          
        <Dialog
          open={open}
          onClose={handleCloseDel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" className={classes.dialogTitle} color="secondary">{"Confirmation de suppression"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Etes-vous sûr de vouloir supprimer cette tâche ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDel} variant="outlined" color="primary" >
              Annuler
            </Button>
            <ButtonCustom
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => {handleDelete()} }
              color="secondary"
              // className={classes.submit}
            >
              Confirmation de suppression
            </ButtonCustom>
          </DialogActions>
        </Dialog>
      
        
        <Footer />
    </div>  

  )
}

export default withRoot(Task);
