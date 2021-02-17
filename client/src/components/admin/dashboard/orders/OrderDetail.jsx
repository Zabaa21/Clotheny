import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CachedIcon from '@material-ui/icons/Cached';
import BlockIcon from '@material-ui/icons/Block';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Chip from '@material-ui/core/Chip';
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getOrderDetails, getOrderProducts} from '../../../../redux/ordersReducer/actionOrders'
import Divider from '@material-ui/core/Divider';
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
}));

export default function OrderDetail() {
  const {userId, orderId} = useParams()
  const classes = useStyles();
  const dispatch = useDispatch()
  const order = useSelector(state => state.ordersReducer.orders)
  const orderDetail = useSelector(state => state.ordersReducer.orderDetail)

  useEffect(() => {
    dispatch(getOrderProducts(userId, orderId))
    dispatch(getOrderDetails(orderId))
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

  return (
    <>
    <div>
      <Grid container >
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
            <IconButton color="inherit" aria-label="upload picture" component="span" onClick={() => generatePDF()}> 
              <CloudDownloadIcon />
            </IconButton>
          </Grid>
      </Grid>
      <List disablePadding>
        {order && order.map((product) => (
          <React.Fragment key={product.id}>
          <ListItem className={classes.listItem} >
            <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
            <Typography variant="body2">{numberFormat(product.price)}</Typography>
          </ListItem>
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
      { checkState(orderDetail.state) ? 
        <Typography variant="subtitle1" className={classes.total}>No shipping details yet</Typography> 
        : 
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping info
          </Typography>
          <Typography gutterBottom>{`${orderDetail.firstName} ${orderDetail.lastName}`}</Typography>
          <Typography gutterBottom>{`Address: ${orderDetail.shippingAddress} - Zip: ${orderDetail.shippingZip}`}</Typography>
          <Typography gutterBottom>{`City: ${orderDetail.shippingCity}, ${orderDetail.shippingState}`}</Typography>
        </Grid>
      </Grid>}
      </div>
    </>
  );
}