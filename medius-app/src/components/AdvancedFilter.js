import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';

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

const AdvancedFilter = ({ searchValue, handleChangeValue }) => {
  const classes = useStyles();
  return (
    <div className="Filters">
    <FormControl style={{marginRight: '1%', width: '10%'}} className={classes.formControl}>
      <InputLabel htmlFor="uncontrolled-native">Rating</InputLabel>
      <NativeSelect onChange={e => handleChangeValue(e)} value={searchValue.rating} name="rating">
        <option value=""/>
        <option value={4.5}> >4.5 </option>
        <option value={3}> >3.0 </option>
        <option value={1}> >1 </option>
      </NativeSelect>
    </FormControl>
    <FormControl style={{marginLeft: '1%', marginRight: '1%', width: '15%'}} className={classes.formControl}>
      <InputLabel htmlFor="uncontrolled-native">Profession</InputLabel>
      <NativeSelect onChange={e => handleChangeValue(e)} value={searchValue.profession} name="profession">
        <option value="" />
        <option value={'vocals'}>vocals</option>
        <option value={'composer'}>composer</option>
        <option value={'conductor'}>conductor</option>
      </NativeSelect>
    </FormControl>
    <FormControl style={{marginLeft: '1%', width: '15%'}} className={classes.formControl}>
      <InputLabel htmlFor="uncontrolled-native">Language</InputLabel>
        <NativeSelect onChange={e => handleChangeValue(e)} value={searchValue.language} name="language">
          <option value="" />
          <option value={'English'}>English</option>
          <option value={'Arabic'}>Arabic</option>
          <option value={'Spanish'}>Spanish</option>
        </NativeSelect>
      </FormControl>
    </div>
  );
};

export default AdvancedFilter;