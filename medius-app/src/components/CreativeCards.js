import React from "react";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  cartImage: {
    display: 'flex',
    width: '100%',
    height: '100%',
  }
}));

const CreativesCard = ({ creativesList }) => {
  const classes = useStyles();
  return(
    <div className={classes.root}>
      <Grid container spacing={3} direction="row" justify="center" alignItems="flex-start" style={{padding: '5%'}}>
      {creativesList.map(creative => (
        <Grid item xs={3}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={'/../../public/data/default.jpg'}
              title={creative.name}
            />
            <img className={classes.cartImage} alt="t-shirt" src = {'./data/default.jpg'} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">{creative.name}</Typography>
              <Typography variant="h6" component="h3">{creative.rating}</Typography>
              <Typography variant="body2" color="textSecondary" component="p">{creative.profession}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">HIRE</Button>
            <Button size="small" color="primary">Learn More</Button>
          </CardActions>
          </Card>
          </Grid>
        ))}
        </Grid>
      </div>
  )
};

export default CreativesCard;