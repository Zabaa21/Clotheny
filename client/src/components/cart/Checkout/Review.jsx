import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import {useSelector, useDispatch} from "react-redux"
import {setProducts} from "../../../redux/checkOutReducer/checkOutAction"

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  displayRight: {
    padding: theme.spacing(1, 0),
    display: "flex", 
    justifyContent:"flex-end"
  }
}));

export default function Review() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.checkoutReducer.products)
  const paymentForm = useSelector(state => state.checkoutReducer.paymentForm)
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    dispatch(setProducts(userId))
    // eslint-disable-next-line
  },[dispatch])
  
  const numberFormat = (value) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'ARS',
    currencyDisplay: 'symbol'
}).format(value);

  const classes = useStyles();

  const totalPrice = () => {
    let price = 0
    products.forEach(prod => {
      price += prod.price * prod.quantity
    })
    dispatch({type: "SET_TOTAL_PRICE", payload: price})
    return numberFormat(price)
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
            <Typography variant="body2">{numberFormat(product.price*product.quantity)}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.displayRight}>
          <Typography variant="subtitle1" className={classes.total}>
            {totalPrice()}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping info
          </Typography>
          <Typography gutterBottom>{`${paymentForm.firstName} ${paymentForm.lastName}`}</Typography>
          <Typography gutterBottom>{`Address: ${paymentForm.address} - Zip: ${paymentForm.zip}`}</Typography>
          <Typography gutterBottom>{`City: ${paymentForm.city}, ${paymentForm.state}`}</Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}