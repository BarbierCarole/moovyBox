import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import QueueIcon from '@material-ui/icons/Queue';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import withRoot from '../modules/withRoot';
import Footer from '../modules/views/Footer';
import Header from '../modules/views/Header';
import TextField from '@material-ui/core/TextField';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
// to redirection signin
import { useSelector } from 'react-redux';
import { Redirect} from 'react-router';
import { toast } from 'react-toastify';

axios.defaults.withCredentials = true;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  item: {
    marginTop: "10px",

  },
  form: {
    padding: "20px"
  }
}));

axios.defaults.withCredentials = true;

toast.configure();

const Item = (props) => {
    const classes = useStyles();
    const [item, setItem] = useState([]);
    const [name, setName] = useState('');
    const [box_id, setBoxeId] = useState(props.location.state.id);
    const [getItem, setGetItem] = useState(false)

    const isLogged = useSelector((state) => state.isLogged);

    if (!isLogged) {
      console.log('isLogged',isLogged);
      //console.log('email,password page App/index',email,password);
      return <Redirect to="/signin" />;
    };

    const successAdd = () => {
      toast.success('Votre objet a bien été ajouté au carton !', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        closeOnClick: true
      })
    }

    const successDelete = () => {
      toast.success('Votre objet a bien été supprimé du carton !', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        closeOnClick: true
      })
    }

    const errorDelete = () => {
      toast.error('Une erreur est survenue. Veuillez réessayer ultérieurement !', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        closeOnClick: true
      })
    }

    useEffect(() => {
        axios.get(`http://localhost:5050/box/${props.location.state.id}`)
             .then(res => {
               console.log(res.data);
               setItem(res.data);
             })
             .catch(err => {
               console.log(err);
             })
      }, []);

      useEffect(() => {
        axios.get(`http://localhost:5050/box/${props.location.state.id}`)
             .then(res => {
               console.log(res.data);
               setItem(res.data);
               setGetItem(false)
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
        console.log(e.target.value);
        setName(e.target.value);
    }

    const handleSubmit = (e) => {
        addItem(name);
        e.preventDefault();
        const data = {name, box_id};
        console.log('data :', data);
        axios.post('http://localhost:5050/item', data)
             .then(res => {
                 console.log('ici les items', res.data);
                 setGetItem(true)
                 successAdd();
             }).catch(err => {
                console.log(err);
                errorDelete();
              });
    }

    const handleDelete = (id) => {

        console.log('cliqué');

        axios.delete(`http://localhost:5050/item/${id}`)
             .then(res => {
              setItem(item.filter((ite)=>(ite.id !== id)));
              successDelete();
             }).catch(err => {
              console.log(err);
              errorDelete();
            })
      };

    return (
        <div className={classes.root}>
            <Header />
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <QueueIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
                Ajouter un objet au carton
            </Typography>
            <form noValidate autoComplete="on" className={classes.form} onSubmit={handleSubmit}>
            <TextField id="outlined-basic" label="Item" variant="outlined" value={item.name}  onChange={handleItemChange}/>
            </form>
            <ul>
                {item.map(elt =>
                <li key={elt.id}>
                    <Button variant="outlined" color="primary" className={classes.item}>
                        {elt.name}
                        {/* <HighlightOffIcon fontSize="small" color="inherit" edge="end" onClick={() => {handleDelete(elt.id)}}/> */}
                    </Button>
                    <HighlightOffIcon fontSize="small" color="inherit" edge="end" onClick={() => {handleDelete(elt.id)}}/>
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
