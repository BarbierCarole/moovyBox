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

export default useStyles;