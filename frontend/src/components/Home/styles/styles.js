import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( {
    
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    card: {
      width: "70%",
      margin: "auto",
      marginBottom: 20,
      marginTop: 20
    },
    title: {
      fontSize: 25,
    },
    button: {
        width: "90%",
        margin: "auto"
    },
    button2: {
        width: "50%",
        margin: "auto",
    },
  });
  export default useStyles;