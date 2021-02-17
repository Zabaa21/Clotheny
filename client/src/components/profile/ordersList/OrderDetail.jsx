import { Button, Modal, Paper, TextField } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import BlockIcon from '@material-ui/icons/Block';
import CachedIcon from '@material-ui/icons/Cached';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import NavigationIcon from '@material-ui/icons/Navigation';
import RateReviewIcon from '@material-ui/icons/RateReview';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Rating from '@material-ui/lab/Rating';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getOrderDetails, getOrderProducts } from '../../../redux/ordersReducer/actionOrders';
import { postReview } from '../../../redux/reviewsReducer/actionsReviews';
import axios from 'axios'
import IconButton from '@material-ui/core/IconButton';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(0.4, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    justifyContent: 'center',
    boxShadow: "none",
    padding: theme.spacing(5),
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function OrderDetail() {
  const {userId, orderId} = useParams()
  const classes = useStyles();
  const dispatch = useDispatch()
  const order = useSelector(state => state.ordersReducer.orders)
  const orderDetail = useSelector(state => state.ordersReducer.orderDetail)
  const history  = useHistory()
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(3);
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({})
  const [userReviews, setUserReviews] = useState([])


  useEffect(() => {
    dispatch(getOrderProducts(userId, orderId))
    dispatch(getOrderDetails(orderId))
    axios.get(`/reviews/userProducts/${userId}`).then(res => {
      setUserReviews(res.data)
    })
    // eslint-disable-next-line
  }, []) 

  const numberFormat = (value) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'ARS',
    currencyDisplay: 'symbol'
  }).format(value);

  const getChipStatus = (status) => {
      switch(status) {
            case "cart":{
                return (
                <Chip style={{backgroundColor:'#64b5f6'}} size="small" label={"cart"} icon={<AddShoppingCartIcon />} />
                )
            }
            case "created":{
                return (
                <Chip style={{backgroundColor:'#ffb74d'}} size="small" label={"created"} icon={<ShoppingCartIcon />} />
                )
            }
            case "processing":{
                return (
                <Chip style={{backgroundColor:'#81c784'}} size="small" label={"processing"} icon={<CachedIcon />} />
                )
            }
            case "cancelled":{
                return (
                <Chip style={{backgroundColor:'#e57373'}} size="small" label={"cancelled"} icon={<BlockIcon />} />
                )
            }
            case "completed":{
                return (
                <Chip style={{backgroundColor:'#4caf50'}} size="small" label={"completed"}icon={<DoneAllIcon />} />
                )
            }
            default: {
                return
            }
          
      }
  }

  const checkState = (state) => {
    if(state === "cart" || state === "created" || state ===  "processing"){
      return true
    }
    else return false;
  }

  const handleGoBack = () => {
    history.push('/me')
  }

  const handleSubmit = (e, productId) => {
    let data = {productId, userId, rating, description}
    e.preventDefault();
    dispatch(postReview(data));
    setOpen(false)
    setDescription("")
    setRating(3)

  };
  
  const handleOpen = (product) => {
    setOpen(true);
    setProduct(product)
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const reviewModal = () => {
    if(open){
      return (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Give us your feedback</h2>
          <Box className={classes.root}> 
            <form onSubmit={(e) => handleSubmit(e, product.id)} noValidate name="simple-controlled">
              <Typography component="legend">Send us your review</Typography>
                <Rating
                  name="simple-controlled"
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                />  
              <TextField 
                id="standard-basic" 
                label="Review" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
              />
              <Divider />
              <Button variant="contained" color="primary" type='submit' >
                  Send
              </Button>
            </form>      
          </Box>
          <Button onClick={handleClose} type="button" color="secondary">
              Cancel
          </Button>
    </div>)}
    else{
      return <div></div>
    }
  }

  const generatePDF = () => {
    var bill = document.getElementById('bill');
    html2canvas(bill,{
    onclone: function (documentClone) {
      var reviews = documentClone.getElementsByClassName('notPDF')
      for(let item of reviews){
        item.remove()
      }
    }})
    .then((canvas) => {
      const doc = new jsPDF();
      var imgData = canvas.toDataURL('image/png');
      var imgWidth = 210;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var position = 0;
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      doc.save('comprobanteVenta.pdf');
    }) 
  }


  const userReviewsComponent = (product) => {
    if(!userReviews.find((item) => parseInt(item.productId) === parseInt(product.id))){
      return (
      <div className="notPDF">
        <Button startIcon={<RateReviewIcon />} type="button" color="secondary" onClick={() => handleOpen(product)}> Write a review </Button>
        <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description">
           {reviewModal()} 
        </Modal>
      </div>)
    }
    else{
      return (<Typography variant="subtitle2" className="notPDF" gutterBottom>
      You have already made a Review for this product
    </Typography>)
    }
  }

  const generatePDFComponent = () => {
    if(orderDetail.state === "completed" || orderDetail.state === "cancelled"){
      return(
        <IconButton color="inherit" aria-label="upload picture" component="span" onClick={() => generatePDF()}> 
          <CloudDownloadIcon />
        </IconButton>
      )
    }
    else{
      return null;
    }
  }

  return (
    <>
    <Grid container justify="center" alignItems="center">
      <Grid item xs={false} sm={2}></Grid>
      <Grid item container xs={12} sm={8}>
        <Paper id="bill" style={{width: "100%", marginTop: "5%",marginBottom: "5%", padding:"5%"}}>
        <Grid item container  alignItems="center">
          <Grid item xs={6}>
            <Typography variant="h6" gutterBottom>
              Order: #{orderDetail.id}
            </Typography>
          </Grid>
          <Grid item xs={4} className="notPDF">
            <Typography variant="h6" gutterBottom>
              State: {orderDetail && getChipStatus(orderDetail.state)}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            {generatePDFComponent()}
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={12}>
          <List disablePadding>
            {order && order.map((product) => (
              <React.Fragment key={product.id}>
                <ListItem className={classes.listItem} >
                  <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity} - (${numberFormat(product.quantity * product.price)})`} />
                  <Typography variant="body2">{numberFormat(product.price)}</Typography>
                </ListItem>
                <div className="notPDF">
                  { orderDetail.state === "completed" ? userReviewsComponent(product): null}
                </div>
              <Divider />
              </React.Fragment>
            ))}
            <ListItem className={classes.listItem}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" className={classes.total}>
                {numberFormat(orderDetail.purchaseAmount)}
              </Typography>
            </ListItem>
          </List>
          </Grid>
          { checkState(orderDetail.state) ? 
          <Typography variant="subtitle1" className={classes.total}>No shipping details yet</Typography> 
          : 
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom className={classes.title}>
                Shipping info
              </Typography>
              <Typography gutterBottom>{`${orderDetail.firstName} ${orderDetail.lastName}`}</Typography>
              <Typography gutterBottom>{`Address: ${orderDetail.shippingAddress} - Zip: ${orderDetail.shippingZip}`}</Typography>
              <Typography gutterBottom>{`City: ${orderDetail.shippingCity}, ${orderDetail.shippingState}`}</Typography>
            </Grid>
          </Grid>}
        </Grid>
        </Paper>
      </Grid>
      <Grid item xs={false} sm={2}></Grid>    
    </Grid>
    <Grid container>
      <Grid item xs={false} sm={2}></Grid>
      <Grid item container xs={12} sm={8} justify="flex-end">
        <Grid item >
          <Fab
          variant="extended"
          size="small"
          color="inherit"
          aria-label="add"
          className={classes.margin}
          onClick={handleGoBack}
          >
          <NavigationIcon className={classes.extendedIcon} />
          Go back
          </Fab>
        </Grid>
      </Grid>
      <Grid item xs={false} sm={2}></Grid>
    </Grid>
      
    </>
  );
}