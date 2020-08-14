import React from 'react';
import withRoot from '../modules/withRoot';
import { loadCSS } from 'fg-loadcss';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import './styles.css';
import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';
import Footer from '../modules/views/Footer';
import Header from '../modules/views/Header';
import imgCecile from './cecile.png';
import imgNico from './nico.jpg';

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

const Contact = () => {
    const classes = useStyles();
    const preventDefault = (event) => event.preventDefault();

    React.useEffect(() => {
        loadCSS(
          'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
          document.querySelector('#font-awesome-css'),
        );
      }, []);

    return(
        <div className={classes.root}>
            <Header />
            <Typography className={classes.title}>Nous contacter</Typography>
            <Grid container spacing={2} className={classes.container}>
                <Grid container spacing={2}>
                    <Grid item xs={12}  sm={6}>
                        <Paper className={classes.paper}>
                            <Grid>
                                <Avatar src={imgCecile} className={classes.large} />
                                <Typography className={classes.name}>Cécile Duhain</Typography>
                                <Typography className={classes.describe} variant='body2'>Product owner</Typography>
                                <Link href="https://github.com/scroutch?tab=repositories" target="_blank"><Icon className="fab fa-github" color="primary" /></Link>
                                <Link href="https://www.linkedin.com/in/cecile-duhain/" target="_blank"><Icon className="fab fa-linkedin-in" color="primary" /></Link>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            <Grid>
                                <Avatar src={imgNico} className={classes.large} />
                                <Typography className={classes.name}>Nicolas Garçon</Typography>
                                <Typography className={classes.describe} variant='body2'>Scrum master</Typography>
                                <Link href="https://github.com/ngarcon" target="_blank"><Icon className="fab fa-github" color="primary" /></Link>
                                <Link href="https://www.linkedin.com/in/nicolas-garcon/" target="_blank"><Icon className="fab fa-linkedin-in" color="primary" /></Link>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            <Grid>
                                <Avatar src="/broken-image.jpg" className={classes.large} />
                                <Typography className={classes.name}>Carole Barbier</Typography>
                                <Typography className={classes.describe} variant='body2'>Lead front</Typography>
                                <Link href="https://github.com/BarbierCarole" target="_blank"><Icon className="fab fa-github" color="primary" /></Link>
                                <Link href="https://www.linkedin.com/in/carole-barbier/" target="_blank"><Icon className="fab fa-linkedin-in" color="primary" /></Link>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paper}>
                            <Grid>
                                <Avatar src="/broken-image.jpg" className={classes.large} />
                                <Typography className={classes.name}>Sebastien Gardes</Typography>
                                <Typography className={classes.describe} variant='body2'>Lead back</Typography>
                                <Link href="https://github.com/Sebastien-Gardes" target="_blank"><Icon className="fab fa-github" color="primary" /></Link>
                                <Link href="https://www.linkedin.com/in/sebgardes/" target="_blank"><Icon className="fab fa-linkedin-in" color="primary" /></Link>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <Footer />
        </div>
    )
}

export default withRoot(Contact);