import { Button, Card, CardMedia, Grid, Typography } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addItem } from '../../redux/cartReducer/action.js';
import Review from '../review/Review.jsx';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import TotalReviews from '../review/totalReviews.jsx';

const useStyles = makeStyles((theme) => ({
    media: {
        height: 400,

    },
    cards: {
        border: "none",
        boxShadow: "none",
        marginTop: theme.spacing(5),
        // marginLeft: theme.spacing(20),
        // marginRight: theme.spacing(10)
    },
    fonts: {
        fontFamily: "unset",
        marginBottom: theme.spacing(1)
    },
    desc: {
      marginTop: theme.spacing(5)
    }
  
}))

export default function ProductDetail (props) {
  const dispatch = useDispatch();
  // const { product, image } = props.location.state;
  const classes = useStyles();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([])
  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "ARS",
      currencyDisplay: "symbol",
    }).format(value);

  useEffect(() => {
    axios.get(`/products/${parseInt(id)}`).then(res => {
      setProducts(res.data)
    })
    axios.get(`/dashboard/image/${id}`).then(res => {
      setImages(res.data[0].images[0].url)})
      // eslint-disable-next-line
    }, [])

    return (
    <>
        <Grid item container direction="row" justify="space-evenly" alignItems="center">
          
           <Grid item container spacing={3} xs={12} sm={12}>

                      {/* Grilla Imagen */}
                      <Grid item xs={4} sm={5}>
                          <Card className={classes.cards}>
                              <CardActionArea>
                              <CardMedia
                                  component="img"
                                  alt="ProductCard"
                                  className={classes.media}
                                  src={images.length ? images : ""}
                                  title="ProductCard"        
                                />
                              </CardActionArea>
                          </Card>
                      </Grid>
                      {/* Grilla Lateral Derecha */}
                      <Grid item xs={8} sm={7}>
                          <Card className={classes.cards} variant="outlined">
                                <Typography
                                className={classes.fonts}
                                gutterBottom
                                variant="h5"
                                display="block"
                                >
                                {products.name}
                                </Typography>
                                <TotalReviews />
                                <Typography variant="h6" className={classes.fonts}>{numberFormat(products.price)}</Typography>
                                <Typography className={classes.fonts}>{products.description}</Typography>
                                <Typography className={classes.fonts}>Stock:{products.stock}</Typography>
                                <Button
                                    startIcon={<LocalMallIcon />}
                                    color='secondary'
                                    onClick={() => dispatch(addItem(products))}
                                >
                                    Add to Cart
                                </Button>
                                <Button
                                    startIcon={<FavoriteBorderIcon />}
                                    color='secondary'
                                    // onClick={() => dispatch(addFavorite(products))}
                                >
                                    Add to WishList
                                </Button>
                          </Card>
                        </Grid>
          </Grid>
                      <Grid item xs={6}>
                      <Review id={id}/>
                      </Grid>
        </Grid>
    </>
  );
}
