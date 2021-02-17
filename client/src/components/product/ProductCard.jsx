import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/cartReducer/action.js'
import LocalMallIcon from '@material-ui/icons/LocalMall';
import Swal from 'sweetalert2'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { postWish } from '../../redux/wishReducer/actionsWish.js';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 400,
  },
});

function ProductCard({product}) {
  const [image, setImage] = useState([])
  const cartState = useSelector((state) => state.cartReducer.cartState);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id, name, description, price } = product;
  const userId = localStorage.getItem('userId');
  const data = { productId: id, userId: userId };
 
  useEffect(() => {
    axios.get(`/dashboard/image/${id}`).then(res => {
      setImage(res.data[0].images)})
      // eslint-disable-next-line
  }, [])

  const handleAddProduct = () => {
    if(cartState === "cart"){
      dispatch(addItem(product))
    }
    else{
      Swal.fire('Oops...', `
      Finish your Order before adding new products to the Cart.<br>        
       `, 'error')
    }
  }

  const handleAddWish = () => {
    if(userId){
      dispatch(postWish(data))
    }else{
      Swal.fire('Oops...!', `
      You must be logged to add a product in wishlist<br>        
      `);
    }
   }

  return (
    <Card className={classes.root}>
      <CardActionArea
      onClick={() => history.push(`/product/${id}`)}
      >
        <CardMedia
          component="img"
          alt="ProductCard"
          className={classes.media}
          src={image.length ? image[0].url : ""}
          title="ProductCard"        
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <Typography variant="h5" color="textPrimary" component="p">
            $ {price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
            {/* =========== Button add to whisList =========== */}
        <Button size="small" color="secondary" 
        onClick={() => handleAddWish()}
        >
          <FavoriteIcon />
        </Button>
        <Grid container justify="flex-end">
        <Button size="small" color="secondary" onClick={() => history.push(`/product/${id}`)}>
          <MoreHorizIcon /> More
        </Button>
        <Button size="small" color="secondary" onClick={handleAddProduct}>
          <LocalMallIcon />
        </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
