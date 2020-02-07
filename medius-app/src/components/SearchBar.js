import React, { useState,useEffect,useRef, useReducer } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import firebase from '../Firebase';
import CreativeCards from "./CreativeCards";
import AdvancedFilter from './AdvancedFilter';

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
  </div>
  )
};

const SearchBar = () => {
  const [creatives, setCreatives] = useState([]);
  const componentIsMounted = useRef(true);
  const [filterInput, setFilterInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      language: "", 
      gender: "", 
      age : "", 
      profession: "", 
      rating: ""
    }
  );

  useEffect(() => {
    const handleData = snap => {
      let values = snap.val()
      if (values){
        let contents = []
        for (let i=0; i<values.length; i++) {
          contents.push({name: values[i].Name, 
            key: 'id' + i,
            language: values[i].Language, 
            gender: values[i].Gender, 
            age : values[i].Age, 
            profession: values[i].Profession, 
            rating: values[i].Rating})
          }
          if (componentIsMounted.current) {
            setCreatives(contents);
          }
      } 
    }
    const creativesRef = firebase.database().ref('/creatives')
    creativesRef.on('value', handleData, error => console.log("Error fetching creatives",error));
    return () => { 
      componentIsMounted.current = false;
      creativesRef.off('value', handleData); };
  }, []);

  const handleFilterCreatives = event => {
    const { name, value } = event.target;
    setFilterInput({ [name]: value });
  };
  
  const filterCreatives = list => {
    console.log("filterCreatives list",list)
    return list.filter(item => {
      return (
        item.language.toLowerCase().includes(filterInput.language.toLowerCase()) &&
        item.profession.toLowerCase().includes(filterInput.profession.toLowerCase()) &&
        item.rating >= filterInput.rating
      );
    });
  };
  const creativesList = filterCreatives(creatives);
  
  return (
    <div>
      <SearchBox data={creatives}/>
      <AdvancedFilter
        searchValue={filterInput}
        handleChangeValue={handleFilterCreatives}
      />
      

    <CreativeCards creativesList={creativesList} />
    </div>
  );
}
export default SearchBar;