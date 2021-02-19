import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      justifyContent: 'center',      
    },
    
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
        
    accordion:{
      fontSize: theme.typography.pxToRem(30), //15
      fontWeight: theme.typography.fontWeightRegular,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      width:'98%'
      
    },

    accordionSummary: {
      backgroundColor: '#ddd',
    },

    accordionDetails: {
      backgroundColor: '#eee',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
    },

    fab: {
      marginLeft: theme.spacing(-2),
      zIndex:'1000',
    },

    expandMoreIcon: {
      color: '#ea2aad',
    },
    
}));

export default useStyles;