import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    paper: {
      marginTop: theme.spacing(2),
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
      margin: theme.spacing(3, 0),
    },
    // submit: {
    //   marginLeft: theme.spacing(-2),
    // },
    // item: {
    //   marginTop: "10px",
  
    // },
    // form: {
    //   padding: "20px"
    // },
    fab: {
      marginLeft: theme.spacing(-2),
      zIndex:'1000',
    },
    addIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
    
}));

export default useStyles;