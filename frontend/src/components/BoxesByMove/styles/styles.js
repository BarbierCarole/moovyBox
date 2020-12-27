import { makeStyles } from '@material-ui/core/styles';
import { fade} from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexGrow: 1,
      flexWrap: 'wrap',
      alignContent: 'center',
      flexDirection: 'column',
      minHeight: '100vh',
      // for the font awesome
      '& > .fas': {
        margin: theme.spacing(2),     
      },
      backgroundColor:'#eeeeee',
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
      marginRight: theme.spacing(-3),
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
    arround: { 
      width: 40,
      height: 40,
      display: 'flex',
      overflow: 'hidden',
      alignItems: 'center',
      flexShrink: 0,
      lineHight: 1,
      userSelect: 'none',
      borderRadius: 20,
      justifyContent: 'center', 
      color: '#fff',
      backgroundColor: theme.palette.secondary.main,
  
    },
    btn: {
      width: '90%',
      padding: theme.spacing(1),
      marginBottom: theme.spacing(2),
      textTransform: "none",
      fontWeight: 500,
    },
    arrow: { 
      margin: theme.spacing(0,1, 0,1 ),
     
    },
    // research
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
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
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
      
    },
    textLeft: {
      textAlign: 'left',
    },
    card: {
      width: '90%',
      margin: theme.spacing(1),
      display: "flex", 
      justifyContent: "center" 
    },
    
    boxLi: {
      width: '100%',
      backgroundColor: '#ffffff',    
    }  
    
  }));

  export default useStyles;