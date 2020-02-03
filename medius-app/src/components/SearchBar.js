import React, { useState,useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import firebase from '../Firebase';

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

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
  return(
  <Autocomplete style={{
    position: 'absolute', left: '50%', top: '50%', width: 400,
    transform: 'translate(-50%, -50%)'}}
    id="combo-box-demo"
    options={Object.keys(data).length === 0?[]:data}
    classes={{
      option: classes.option,
    }}
    getOptionLabel={option => option.name}
    renderOption={option => (
      <React.Fragment>
        <span style={{color: rateCheck(option.rating)}}>{option.rating}</span>
        {option.name} 
        <span style={{color: 'grey', fontSize: 12}}> ({option.profession}) </span>
      </React.Fragment>
    )}
    renderInput={params => (
    <TextField {...params} label="Search by name, rating, or profession" variant="outlined" fullWidth />
  )}
/>)
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