
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 0,
    },
    menuButton: {
      marginRight: theme.spacing(3),
  
    },
    title: {
      fontSize: 24,
    },
    toolbar: {
      justifyContent: 'space-between',
    },
    left: {
      flex: 1,
    },
    leftLinkActive: {
      color: theme.palette.common.white,
    },
    right: {
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-end',
    },
    menu: {
      paddingTop: "26px",
    },
    rightLink: {
      fontSize: 16,
      color: theme.palette.common.white,
      marginLeft: theme.spacing(3),
    },
    linkSecondary: {
      color: theme.palette.secondary.main,
    }
  }));

  export default useStyles;