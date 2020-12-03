import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        marginBottom: 10,
      },
      large: {
        width: theme.spacing(18),
        height: theme.spacing(18),
        margin: "auto",
        marginBottom: 10
      },
      title: {
          fontSize: 30,
          padding: 25,
          textAlign: 'center',
          marginBottom: 20,
          marginTop: 20
      },
      name: {
          padding: 10,
          fontSize: 20,
      },
      container: {
          marginBottom: 5
      },
      describe: {
          padding: 15
      }
  }));

  export default useStyles;