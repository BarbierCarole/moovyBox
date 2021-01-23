import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignContent: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    // for the font awesome
    '& > .fa': {
      margin: theme.spacing(2),
    },
  },

  liste: {
    marginTop: theme.spacing(5),
    textAlign: 'center',

  },
  // btn for the button of moves and boxes
  btn: {
    width: '90%',
    padding: theme.spacing(1),
    marginBottom: theme.spacing(2),
    textTransform: "none",
    fontWeight: 500,


  },
  title: {
    textAlign: 'center',
    paddingTop: theme.spacing(1),
    margin: theme.spacing(1),
  },
  dialogTitle: {
    backgroundColor: theme.palette.secondary.main,
  },

  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  fab: {
    marginRight: theme.spacing(-3),
    zIndex:'1000',
  }

}));
export default useStyles;