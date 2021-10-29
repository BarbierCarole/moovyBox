
import { pink } from '@material-ui/core/colors';
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
    },
    bgHeader: {
      // background:'url(../../../../../../styles/img/bg-header-pink.svg ) no-repeat left bottom,linear-gradient(90deg, #BA81FF 0%, #FF6A95 99%)',
      background: '#888888',
    }
  }));

  export default useStyles;