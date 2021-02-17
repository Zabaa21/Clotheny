import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import axios from 'axios';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, IconButton, ListItemText, Paper } from '@material-ui/core';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { addItem } from '../../redux/cartReducer/action.js';
import { deleteWish } from '../../redux/wishReducer/actionsWish';

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

const WishDetail = (product) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState([]);
  const { id, name, price } = product.data;
  const classes = useStyles();
  const numberFormat = (value) => new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol'
    }).format(value);

  const handleRemove = () => {
    dispatch(deleteWish(product.data.WishLine.id))
  };
  
  const handleAddToCart = () => {
    dispatch(deleteWish(product.data.WishLine.id))
    dispatch(addItem(product.data))
  }
  
  //imagenes
  //en el axios get
  //si pongo productId carga la primera vez que entras a wish
  //si pongo product.data.id no carga la primera vez pero luego si las carga
  useEffect(() => {
    axios.get(`/dashboard/image/${id}`).then(res => {
      res.data.length && setImage(res.data[0].images)})
    // eslint-disable-next-line
  }, []);
  
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
              src={image.length ? image[0].url : ''}
              title="ProductCard"
            />
          </Grid>
          <Grid item xs={6} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <ListItemText
                  primary={name}
                  secondary={numberFormat(price)}
                />
              </Grid>
              <Grid item xs>
                    <Button            
                    startIcon={<LocalMallIcon />}
                    color="secondary"
                    onClick={() => handleAddToCart()}
                    >Add to cart</Button>
              </Grid>
            </Grid>
            <Grid item container xs={2} justify={'flex-end'}>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemove()}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  </>
    // <div>
    //   <CardMedia
    //     component="img"
    //     alt="ProductCard Image"
    //     className={classes.media}
    //     src={image.length ? image[0].url : ''}
    //     title="ProductCard Image"
    //   />
    //   <h1>
    //     Nombre: {name} <br></br>
    //   </h1>
    //   <h3>
    //     Precio: {price} <br></br>
    //   </h3>
    //   Stock: {stock} <br></br>
      
    // </div>
  );
};
export default WishDetail;
