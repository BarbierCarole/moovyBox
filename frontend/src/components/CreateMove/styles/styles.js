import { makeStyles } from '@material-ui/core/styles';
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
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    title: {
      textAlign: 'center',
      paddingTop: theme.spacing(1),
      margin: theme.spacing(1),
    },
    paperButton: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
   
export default useStyles;