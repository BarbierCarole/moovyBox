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
// to the style !
import useStyles from './styles/styles';

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
                        Et rechercher facilement vos objets dans vos cartons.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button className={classes.button} size="small" variant="contained" color="primary" href="/signIn">Je suis déjà inscrit·e, je me connecte</Button>
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
