import React, { useState,useEffect,useRef, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import firebase from '../Firebase';
import CreativeCards from "./CreativeCards";
import AdvancedFilter from './AdvancedFilter';


const SearchBar = () => {
  const [creatives, setCreatives] = useState([]);
  const componentIsMounted = useRef(true);
  const [filterInput, setFilterInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
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
    //console.log("filterCreatives list",list)
    return list.filter(item => {
      return (
        item.name.toLowerCase().includes(filterInput.name.toLowerCase()) &&
        item.language.toLowerCase().includes(filterInput.language.toLowerCase()) &&
        item.profession.toLowerCase().includes(filterInput.profession.toLowerCase()) &&
        item.rating >= filterInput.rating
      );
    });
  };
  const creativesList = filterCreatives(creatives);
  
  return (
    <div>
      <AdvancedFilter
        data = {creativesList}
        searchValue={filterInput}
        handleChangeValue={handleFilterCreatives}
      />
      

    <CreativeCards creativesList={creativesList} />
    </div>
  );
}
export default SearchBar;