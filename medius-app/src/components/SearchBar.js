import React, { useState,useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import firebase from '../Firebase';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';

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
}));

function rateCheck(score) {
  let color
  if (score > 4.5) {
    color = 'green'
  } else if (score > 3.0) {
    color = 'orange'
  } else {
    color = 'red'
  }
  return color;
}

const SearchBox = ({data}) => {
  console.log("SearchBox data", data)
  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [age, setAge] = React.useState('');
  const creatives = Object.values(data);
  return(
    <div>
      <Autocomplete
        style={{padding: '3%', width: '50%', paddingLeft: '25%'}}
        id="combo-box-demo"
        options={Object.keys(data).length === 0?[]:data}
        classes={{
          option: classes.option,
        }}
        getOptionLabel={option => option.name}
        renderOption={option => (
          <React.Fragment>
            <span style={{color: rateCheck(option.rating)}}>{option.rating}</span>
            <span>{option.name} </span>
            <span style={{color: 'grey', fontSize: 12}}> ({option.profession}) </span>
          </React.Fragment>
        )}
        renderInput={params => (
        <TextField {...params} label="Search by name, rating, or profession" variant="outlined" fullWidth />
      )}
    />
    <div className="Filters">
    <FormControl style={{marginRight: '1%', width: '10%'}} className={classes.formControl}>
        <InputLabel htmlFor="uncontrolled-native">Rating</InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'name',
            id: 'uncontrolled-native',
          }}
        >
          <option value="" />
          <option value={4.5}> >4.5 </option>
          <option value={3}> >3.0 </option>
          <option value={1}> >1 </option>
        </NativeSelect>
      </FormControl>
      <FormControl style={{marginLeft: '1%', marginRight: '1%', width: '10%'}} className={classes.formControl}>
        <InputLabel htmlFor="uncontrolled-native">Profession</InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'name',
            id: 'uncontrolled-native',
          }}
        >
          <option value="" />
          <option value={10}>vocals</option>
          <option value={20}>composer</option>
          <option value={30}>conductor</option>
        </NativeSelect>
      </FormControl>
      <FormControl style={{marginLeft: '1%', width: '10%'}} className={classes.formControl}>
        <InputLabel htmlFor="uncontrolled-native">Language</InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'name',
            id: 'uncontrolled-native',
          }}
        >
          <option value="" />
          <option value={10}>English</option>
          <option value={20}>Arabic</option>
          <option value={30}>Spanish</option>
        </NativeSelect>
      </FormControl>
    </div>
    <div className="Cards">
      <Grid
        container
        spacing = {3}
        direction="row"
        justify="center"
        alignItems="flex-start"
        style={{padding: '5%'}}
      >
        {
          creatives.map(creative =>
        
          <Grid item xs={3}>
          <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={'./data/creatives/'+creative.sku+'_1.jpg'}
              title={creative.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {creative.name}
              </Typography>
              <Typography variant="h6" component="h3">
                {creative.rating}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {creative.profession}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              HIRE
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
        </Grid>
          )}
      </Grid>
    </div>
  </div>
  )
};

const SearchBar = () => {
  const [creatives, setCreatives] = useState({});
  /*The equivalent of componentDidMount in hooks is the useEffect function
  with second parameter as []*/
  useEffect(() => {
    const handleData = snap => {
      let values = snap.val()
      if (values){
        let contents = []
        for (let i=0; i<values.length; i++) {
          contents.push({name: values[i].Name, 
            language: values[i].Language, 
            gender: values[i].Gender, 
            age : values[i].Age, 
            profession: values[i].Profession, 
            rating: values[i].Rating})
          }
          setCreatives(contents);
      } 
    }
    const creativesRef = firebase.database().ref('/creatives')
    creativesRef.on('value', handleData, error => console.log("Error fetching creatives",error));
    return () => { creativesRef.off('value', handleData); };
  }, []);

  
  return (
    <div>
      <SearchBox data={creatives}/>
    </div>
  );
}
export default SearchBar;