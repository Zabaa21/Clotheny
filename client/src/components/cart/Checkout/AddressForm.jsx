import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {setForm} from '../../../redux/checkOutReducer/checkOutAction'

export default function AddressForm() {
  const dispatch = useDispatch()
  const paymentForm = useSelector(state => state.checkoutReducer.paymentForm)


  const handleInputChange = (info) => {
    dispatch(setForm(info.name, info.value))
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping Info
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            value={paymentForm.firstName}
            fullWidth
            autoComplete="given-name"
            onChange={(e) => handleInputChange(e.target)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            value={paymentForm.lastName}
            label="Last name"
            fullWidth
            autoComplete="family-name"
            onChange={(e) => handleInputChange(e.target)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="address"
            name="address"
            value={paymentForm.address}
            label="Address"
            fullWidth
            autoComplete="shipping address-line1"
            onChange={(e) => handleInputChange(e.target)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            value={paymentForm.zip}
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            onChange={(e) => handleInputChange(e.target)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            value={paymentForm.city}
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            onChange={(e) => handleInputChange(e.target)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            required 
            id="state" 
            name="state" 
            value={paymentForm.state}
            label="State/Province/Region" 
            autoComplete="shipping state-level2"
            onChange={(e) => handleInputChange(e.target)}
            fullWidth />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="comments"
            name="comments"
            value={paymentForm.comments}
            label="Comments"
            fullWidth
            autoComplete="comments"
            onChange={(e) => handleInputChange(e.target)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}