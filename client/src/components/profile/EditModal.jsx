import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(2),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    align: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }));

const validationSchema = yup.object({
  name: yup
    .string('Enter your name')
    .min(1, 'Very short')
    .required('You must write your name'),
  lastName: yup
    .string('Enter your last name')
    .min(1, 'Very short')
    .required('You must write your last name'),
  dni: yup
    .number()
    .min(7)
    .required('Enter your DNI number'),
  country: yup
    .string('Enter your nationality')
    .min(1, 'Very short')
    .required('You must write your nationality'),
  address: yup
    .string('Enter your address')
    .min(1, 'Very short')
    .required('You must write your address'),
  phone: yup
    .number()
    .min(7)
    .required('Enter your phone number'),
});

export default function EditModal({user, initialUser}) {
  const userId = localStorage.getItem('userId')
  const { name, lastName, dni, birthDate, country, address, phone } = user
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: { 
      name: name || '',
      lastName: lastName || '',
      dni: dni || '',
      birthDate: birthDate || '',
      country: country || '',
      address: address || '',
      phone: phone || ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios.put(`/users/edit/${userId}/me`, {user: values})
      .then( () => initialUser())
      formik.resetForm({});
      handleClose()
    },
    enableReinitialize: true
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <IconButton aria-label="edit" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Update Personal Information</DialogTitle>
        <DialogContent>
          {/* Acá va el contenido */}
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <form className={classes.form} onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="secondary"
                      autoComplete="fname"
                      name="name"
                      variant="outlined"
                      required
                      fullWidth
                      id="name"
                      label="First Name"
                      autoFocus
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      required
                      fullWidth
                      id="dni"
                      label="DNI"
                      name="dni"
                      autoComplete="lname"
                      value={formik.values.dni}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      required
                      fullWidth
                      type="date"
                      id="birthDate"
                      label="Birthdate"
                      name="birthDate"
                      autoComplete="lname"
                      value={formik.values.birthDate}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      required
                      fullWidth
                      id="country"
                      label="Country"
                      name="country"
                      autoComplete="lname"
                      value={formik.values.country}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      required
                      fullWidth
                      id="address"
                      label="Address"
                      name="address"
                      autoComplete="lname"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      color="secondary"
                      variant="outlined"
                      required
                      fullWidth
                      id="phone"
                      label="Phone Number"
                      name="phone"
                      autoComplete="lname"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} className={classes.align}>
                    <Button onClick={handleClose} color="secondary">
                      Cancel
                    </Button>
                    <Button type="submit" color="secondary">
                      Edit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
          {/* Acá termina el contenido */}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}