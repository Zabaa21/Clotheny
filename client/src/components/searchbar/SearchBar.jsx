import React, { useState } from 'react';
import {onSearch} from '../../redux/searchBarReducer/actionsProducts'
import { useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
// import { fade } from "@material-ui/core/styles";
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles((theme) => ({
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

  const SearchBar = () => {

  const [product, setProduct] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  
  const handleSubmit = (e) => {
    
    e.preventDefault();
    dispatch(onSearch(product));
    if(product.length){
      return history.push(`/products/search/${product}`);
    }else {
      return history.push(`/products`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="search"
        onChange={(e) => setProduct(e.target.value)}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </form>
  );
};;

export default SearchBar;
