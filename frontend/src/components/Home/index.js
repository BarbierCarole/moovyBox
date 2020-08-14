import React from 'react';
import Slideshow from '../Slide';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import withRoot from '../modules/withRoot';
// import Button from '../modules/components/Button';
import Footer from '../modules/views/Footer';
import './styles.css';
import HeaderHome from '../modules/views/HeaderHome';
import {BrowserRouter as Router, Link} from "react-router-dom";

const useStyles = makeStyles( {
    card: {
        width: "70%",
        margin: "auto",
        marginBottom: 20,
        marginTop: 20
    },
    root: {
      minWidth: 275,
    },
    title: {
      fontSize: 25,
    },
    button: {
        width: "90%",
        margin: "auto"
    },
    button2: {
        width: "50%",
        margin: "auto",
    },
  });

const Home = () => {
    const classes = useStyles();
    return(
        <div>
            <HeaderHome />
            <Card className={classes.card} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        MoovyBox
                    </Typography>
                    <Typography variant="h5" component="h2">
                        Pour mieux gérer vos déménagements
                    </Typography>
                    <Typography variant="body2" component="p">
                        Sint sit ea occaecat culpa est in consequat magna et duis dolor tempor tempor. Officia velit labore adipisicing officia non eu enim quis adipisicing labore. Eu labore ipsum sit laboris magna est commodo nostrud consectetur aliqua elit. Esse irure nostrud cupidatat fugiat enim pariatur.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button className={classes.button} size="small" variant="contained" color="primary" href="/signIn">Je suis déjà inscrit-e, je me connecte</Button>
                </CardActions>
                <CardActions>
                    <Button className={classes.button2} size="small" variant="contained" color="primary" href="/signUp">Je m'inscris</Button>
                </CardActions>
            </Card>
            <Slideshow />
            <div className="contain-btn">
                <Button className="btn2" size="small" variant="contained" color="primary" href="/signUp" endIcon={<ChevronRightIcon />}>Ca cartonne</Button>
            </div>
            <Footer />

        </div>
    )
}

export default withRoot(Home);
