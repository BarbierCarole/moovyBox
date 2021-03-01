import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      justifyContent: 'center',  
      transform: 'translateZ(0px)',
      flexGrow: 1,    
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
        
    buttonAdd: {
      bottom: theme.spacing(12),
      right: theme.spacing(3),
      position:'fixed',
      width: '60px;',
      height:'60px',
      borderRadius: '30px',
    },
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    
}));

export default useStyles;