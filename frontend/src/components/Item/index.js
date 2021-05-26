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
import CssBaseline from '@material-ui/core/Icon';
// to redirection signin
import { useSelector } from 'react-redux';
import { Redirect} from 'react-router';
import { toast } from 'react-toastify';
import GoBack from '../modules/components/GoBack'; 

 axios.defaults.withCredentials = true;

toast.configure();

const Item = (props) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const classes = useStyles();
  const [item, setItem] = useState([]);
  const [name, setName] = useState('');
  const [box_id, setBoxeId] = useState(props.location.state.id);
  const [getItem, setGetItem] = useState(false);


  const isLogged = useSelector((state) => state.isLogged);

  if (!isLogged) {
    console.log('isLogged',isLogged);
    //console.log('email,password page App/index',email,password);
    return <Redirect to="/signin" />;
  };

  const successAdd = () => {
    toast.success('Votre objet a bien été ajouté au carton !', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      closeOnClick: true
    })
  }

  const successDelete = () => {
    toast.success('Votre objet a bien été supprimé du carton !', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      closeOnClick: true
    })
  }

  const errorDelete = () => {
    toast.error('Une erreur est survenue. Veuillez réessayer ultérieurement !', {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
      closeOnClick: true
    })
  }

  useEffect(() => {
    axios.get(BASE_URL+`/api/box/${props.location.state.id}/items`)
      .then(res => {
      console.log(res.data);
      setItem(res.data);
      setGetItem(false);
      console.log("cb: res.data",res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }, [getItem]);


  const addItem = name => {
    const newItems = [...item, {name}];
    setItem(newItems);
  }

  const handleItemChange = (e) => {
      console.log("CB contenu  : ",e.target.value);
      setName(e.target.value);
  }

  const handleSubmit = (e) => {
    // addItem(name);
    e.preventDefault();
    const data = {name, box_id};
    console.log('data :', data);
    axios.post(BASE_URL+'/api/box/${props.location.state.id}/items', data)
      .then(res => {
        console.log('ici les items', res.data);
        setGetItem(true)
        addItem(name);
        successAdd();
        setName(''); // to empty the field
      }).catch(err => {
        console.log(err);
        errorDelete();
      });
  }

  const handleDelete = (id) => {

      console.log('cliqué');

      axios.delete(BASE_URL+`/api/box/${props.location.state.id}/item/${id}`)
            .then(res => {
            setItem(item.filter((ite)=>(ite.id !== id)));
            successDelete();
            }).catch(err => {
            console.log(err);
            errorDelete();
          })
    };

  const deleteZero = (str) => {
    const reg=/(^|[^\d.])0+(?!\.)/g;
    return str= str.replace(reg,'');
  };

  return (
      <div className={classes.root}>
          <Header />
          <Container component="main" maxWidth="xs">
          <Typography component="p" variant="h5">
              <GoBack /> Retour à la page précédente 
          </Typography>
        
          <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
              <QueueIcon />
          </Avatar> */}
          <Icon className="fas fa-box-open" color="secondary" style={{ fontSize: 30, width: 45 }}/>
          <Typography component="h1" variant="h4">
              Ajouter un objet au carton n° {deleteZero(props.location.state.code) }
          </Typography>

          <Typography component="h1" variant="h3">
              {props.location.state.label}
          </Typography>
          {/* new button */}
          
          <form noValidate autoComplete="on" onSubmit={handleSubmit} className={classes.form}>
            <Typography component="h1" variant="h5" className={classes.title}>
              <TextField id="outlined-basic" label="Objet à ajouter" variant="outlined" value={name}  onChange={handleItemChange} style={{borderRadius: '11px', background: '#ffffff', boxShadow:  '4px 4px 7px #d9d9d9, -4px -4px 7px #ffffff'}}/>
              
              <Fab type="submit" color="secondary" className={classes.fab}>
                <AddIcon />
              </Fab>                   
            </Typography>
          </form>                
            
          <ul>
              {item.map((elt, i) =>
              <li key={i}>
              {console.log("key et name", elt.id, elt.name) }
              <Typography component="p" variant="h5">
                {elt.name}
                <HighlightOffIcon fontSize="small" color="inherit" edge="end" onClick={() => {handleDelete(elt.id)}}/>
              </Typography>
              </li>)
              }
          </ul>
          </div>
          </Container>
          <Footer />
      </div>
  )
}

export default withRoot(Item);
