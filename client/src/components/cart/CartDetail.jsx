/* eslint-disable */
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, increaseProduct, decreaseProduct, totalPrice } from '../../redux/cartReducer/action.js';
import { Grid } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
    input: {
      height: 40,
      width: 40,
      textAlign: "center"
    },
    margin: {
        margin: theme.spacing(1),
      },
      media: {
        height: 100,
        width: 100

      },
  }));

const CartDetail = (props) => {
    //const classes = useStyles();
    const dispatch = useDispatch();
    const reduxProducts = useSelector(state => state.cartReducer.cart)
    const {product, setCart, counter, setPrice, price} = props
    const [image, setImage] = useState("")
    const [storageCounter, setStorageCounter] = useState(counter || 1)
    const [reduxProd, setReduxProd] = useState({})
    //const [productCart, setProductCart] = useState(product)
    const classes = useStyles();
    const user = localStorage.getItem('token')

    const numberFormat = (value) => new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol'
    }).format(value);
   
    useEffect(() => {
      axios.get(`/dashboard/image/${product.id}`).then(res => {
        res.data.length && res.data[0].images.length && setImage(res.data[0].images[0].url)
      })

      for(let item of reduxProducts){
        if(item.id === product.id){
          setReduxProd(item)
        }
      }
    }, [product])

    const handleAdd = () => {
      dispatch(increaseProduct(product))
      dispatch(totalPrice())
      if(!user){
      setPrice(price + product.price)
      }
      let i = storageCounter
      i++
      setStorageCounter(i)
    }

    const handleRemove = () => {
      dispatch(decreaseProduct(product))
      dispatch(totalPrice())
      if(!user){
        setPrice(price - product.price)
      }
      if(storageCounter > 1) {
        let i = storageCounter
        i--
        setStorageCounter(i)
      }
    }
  
return (
  <>
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CardMedia
              component="img"
              alt="ProductCard"
              className={classes.media}
              src={image}
              title="ProductCard"
            />
          </Grid>
          <Grid item xs={6} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <ListItemText
                  primary={product.name}
                  secondary={numberFormat(product.price)}
                />
                <ButtonGroup color='secondary' >
                  <Button
                    size="small"
                    aria-label="reduce"
                    onClick={handleRemove}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <Button
                    size="small"
                    aria-label="increase"
                    onClick={handleAdd}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
                <Typography>
                  Quantity: {counter ? storageCounter : reduxProd.localCounter}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={2} justify={'flex-end'}>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  dispatch(removeItem(product));
                  setCart && setCart(JSON.parse(localStorage.getItem('cart')));
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  </>
);
}

export default CartDetail