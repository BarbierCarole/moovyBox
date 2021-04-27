import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { fade} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignContent: 'center',
      flexDirection: 'column',
      minHeight: '100vh',
      // for the font awesome
      '& > .fas': {
      margin: theme.spacing(2),     
      },
      backgroundColor:'#eee',
      justifyContent:'center',
      
    },
  
    content: {
      margin: theme.spacing(1),
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
      
      
    },
    // btn for the button of moves and boxes
   
    title: {
      textAlign: 'center',
      paddingTop: theme.spacing(1),
      margin: theme.spacing(1),
    },
    dialogTitle: {
      backgroundColor: theme.palette.secondary.main,
    },
    
    paper: {
      marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    bgSecondary: {
      backgroundColor: fade(theme.palette.secondary.main, 0.15),
    },
    bgPrimary: {
      backgroundColor: fade(theme.palette.primary.main, 0.25),
    },
    
    fab: {
      marginRight: theme.spacing(-4),
      zIndex:'1000',
    },
    nbrBox: {
      color: '#fff',
      marginTop: '-33px',
      fontWeight: 'bold',
    },
    justifyContentSpaceBetween: {
      justifyContent: 'space-between',
      // backgroundColor: fade(theme.palette.primary.main, 0.25),
    },
    titleBox: { 
      // height: 30,
      display: 'flex',
      overflow: 'hidden',
      alignItems: 'center',
      padding: theme.spacing(1,3),   
      lineHight: 1,
      userSelect: 'none',
      justifyContent: 'center', 
      color: '#fff',
      backgroundColor: theme.palette.secondary.main,
    },
   
    button: {
      padding: theme.spacing(1.5),
      paddingBottom: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(3),
      marginLeft: theme.spacing(2),
      background: '#fff',
      width: "400px",
      [theme.breakpoints.down('sm')]: {
        width: "300px",
      },
    },
      
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textLeft: {
      textAlign: 'left',
    },
    
    link: { 
      display: "flex", 
      justifyContent: "left", 
    },
   
  }));

  export default useStyles;

// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     alignContent: 'center',
//     flexDirection: 'column',
//     minHeight: '100vh',
//     // for the font awesome
//     '& > .fa': {
//       margin: theme.spacing(2),
//     },
//   },

//   liste: {
//     marginTop: theme.spacing(5),
//     textAlign: 'center',

//   },
//   // btn for the button of moves and boxes
//   btn: {
//     width: '90%',
//     padding: theme.spacing(1),
//     marginBottom: theme.spacing(2),
//     textTransform: "none",
//     fontWeight: 500,


//   },
//   title: {
//     textAlign: 'center',
//     paddingTop: theme.spacing(1),
//     margin: theme.spacing(1),
//   },
//   dialogTitle: {
//     backgroundColor: theme.palette.secondary.main,
//   },

//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   fab: {
//     marginRight: theme.spacing(-3),
//     zIndex:'1000',
//   }

// }));
// export default useStyles;