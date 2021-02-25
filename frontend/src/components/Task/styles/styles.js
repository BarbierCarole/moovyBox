import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      justifyContent: 'center', 
      background:'#eee', 
      minWidth: 275,    
    },
    card: {
      
      background: '#fff',
      margin: theme.spacing(2),
    },
    cardContent: {
      width:'80%',
      padding: theme.spacing(2),
    },
    typography:{
      whiteSpace: 'pre-line', // pour afficcher à la ligne, sinon les sauts de ligne ne s'affichent pas
    }, 

    title: {
      fontSize: 18,
      maxWidth: '85%'
    },
    pos: {
      margin:theme.spacing(2),
    },

    speedDial: {
      position: 'absolute',
      '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        top: theme.spacing(0),
        right: theme.spacing(0),
      },
    },
    
}));

export default useStyles;