import React, { useState,useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import firebase from '../Firebase';

const SearchBox = ({data}) => {
  console.log("SearchBox data", data)
  return(
  <Autocomplete style={{
    position: 'absolute', left: '50%', top: '50%', width: 300,
    transform: 'translate(-50%, -50%)'}}
    id="combo-box-demo"
    options={Object.keys(data).length === 0?[]:data}
    getOptionLabel={option => option.name}
    renderInput={params => (
    <TextField {...params} label="Select your contractor!" variant="outlined" fullWidth />
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