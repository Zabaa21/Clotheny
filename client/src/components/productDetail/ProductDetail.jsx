import { Box, Button, CardMedia, Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton } from "react-share";
import Swal from 'sweetalert2';
import { addItem } from '../../redux/cartReducer/action.js';
import { postWish } from '../../redux/wishReducer/actionsWish.js';
import Review from '../review/Review.jsx';
import TotalReviews from '../review/totalReviews.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    boxShadow: 'none',
    marginTop: "5%",
  },
  media: {
    MaxHeight: 300,
    maxWidth: 300,
  },
  info: {
    padding: theme.spacing(5),
  },
  button: {
    padding: theme.spacing(2),
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ProductDetail(props) {
  const dispatch = useDispatch();
  // const { product, image } = props.location.state;
  const classes = useStyles();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const userId = localStorage.getItem('userId');
  const data = { productId: id, userId: userId };
  const numberFormat = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'ARS',
    currencyDisplay: 'symbol',
  }).format(value);
  
  useEffect(() => {
    axios.get(`/products/${parseInt(id)}`).then((res) => {
      setProducts(res.data);
    });
    axios.get(`/dashboard/image/${id}`).then((res) => {
      setImages(res.data[0].images[0].url);
    });
    // eslint-disable-next-line
  }, []);
  
  const handleAddWish = () => {
    if(userId){
      dispatch(postWish(data))
    }else{
      Swal.fire('Oops...!', `
      You must be logged to add a product in wishlist<br>        
      `);
    }
  }
  
  const shareUrl = 'https://www.soyhenry.com/';
  const title = 'Proyecto E-Commerce | Clotheny Shop ';
  
  
  var stockMsg = ''
  if (products.stock < 10){
    stockMsg = <Alert severity="error">Low availability</Alert>
  }
  if (products.stock > 10){
    stockMsg = ''
  }
  

  return (
    <>
      <Box className={classes.root}>
        {/* Foto del producto */}
        <Paper elevation={9}>
          <Grid container direction="row" justify="center">
            <Grid item container xs={12} md={6} justify="center">
              <CardMedia
                component="img"
                alt="ProductCard"
                src={images.length ? images : ''}
                title="ProductCard"
                className={classes.media}
              />
            </Grid>
            <Grid item container xs={12} md={6} justify="center">
              <Grid item className={classes.info}>
                <Typography
                  className={classes.fonts}
                  gutterBottom
                  variant="h5"
                  display="block"
                >
                  {products.name}
                </Typography>
                <TotalReviews />
                <Typography variant="h6" className={classes.fonts}>
                  {numberFormat(products.price)}
                </Typography>
                <Typography className={classes.fonts}>
                  {products.description}
                </Typography>
                <Grid item>
                  <Typography variant="caption">
                    Stock: {products.stock} {stockMsg}
                  </Typography>
                </Grid>
                <Button
                  className={classes.button}
                  startIcon={<FavoriteIcon />}
                  color="secondary"
                  onClick={() => handleAddWish()}
                >
                  Add to WishList
                </Button>
                <Button
                  className={classes.button}
                  startIcon={<LocalMallIcon />}
                  color="secondary"
                  onClick={() => dispatch(addItem(products))}
                >
                  Add to Cart
                </Button>
                <Grid item className={classes.button}>
                  <FacebookShareButton
                    url={shareUrl}
                    quote={title}
                    className="Demo__some-network__share-button"
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={shareUrl}
                    title={title}
                    className="Demo__some-network__share-button"
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <LinkedinShareButton
                    url={shareUrl}
                    className="Demo__some-network__share-button"
                  >
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          </Paper>
        {/* Info del Producto   */}

      </Box>
      <Grid item xs={12}>
        <Review id={id} />
      </Grid>
    </>
  );
}
