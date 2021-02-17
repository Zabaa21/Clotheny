import React from "react";
import {
  Button,
  Grid,
  Typography,
  Container,
  TextField,
  FormControl,
  InputLabel,
  Input,
  Select,
  Avatar,
} from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Swal from 'sweetalert2'
import { useHistory } from "react-router-dom";

const validationSchema = yup.object({
  name: yup
    .string("Insert your name")
    .min(1, "Too short")
    .max(30, "Too long (max 30 chars")
    .required("The name is required"),
  lastName: yup
    .string("Insert your lastname")
    .min(1, "Too short")
    .max(30, "Too long (max 30 chars")
    .required("The lastname is required"),
  dni: yup.string("Your DNI").required("The DNI is required"),
  email: yup
    .string("Your email")
    .email("Email is invalid")
    .required("Email is required"),
  password: yup
    .string("Your password")
    .min(6, "Your password must be more than 6 chars")
    .max(12, "Too long. Max 12 chars")
    .required("The password is required"),
  birthDate: yup.string("YYYY/MM/DD"),
  gender: yup.number(),
  address: yup.string("Your address"),
  country: yup.string("Your country"),
  phone: yup
    .string("Your cellphone")
    .min(1, "Too short")
    .max(15, "Too long. Max 30 chars"),
});

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 190,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(2),
    marginLeft: theme.spacing(21),
    border: "2px solid #fafafa",
  },
}));

const RegisterForm = () => {
  const history = useHistory();
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      dni: "",
      email: "",
      password: "",
      birthDate: "1968-11-05",
      gender: 0,
      address: "",
      country: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post("/users/", values)
        .then((res) => {
          if(res.data.message){
            Swal.fire('Oops...', `${res.data.message}`, 'error')
          }
          else{
            Swal.fire('Congratz', `The user was successfully created`, 'success')
            formik.resetForm({});
            history.push("/");
          }
          
        })
        .catch((error) => {
          Swal.fire('Oops...', `${error}`, 'error')
        });
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Avatar className={classes.avatar}>
        <LockOpenIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              color="secondary"
              autoComplete="name"
              name="name"
              required
              fullWidth
              id="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              color="secondary"
              autoComplete="lastName"
              name="lastName"
              required
              fullWidth
              id="lastName"
              label="Last name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              color="secondary"
              autoComplete="dni"
              name="dni"
              required
              fullWidth
              id="dni"
              label="DNI"
              value={formik.values.dni}
              onChange={formik.handleChange}
              error={formik.touched.dni && Boolean(formik.errors.dni)}
              helperText={formik.touched.dni && formik.errors.dni}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              color="secondary"
              name="password"
              required
              fullWidth
              id="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              color="secondary"
              name="email"
              required
              fullWidth
              id="email"
              label="E-mail"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              color="secondary"
              name="birthDate"
              required
              fullWidth
              type="date"
              id="birthDate"
              /*               InputLabelProps={{
                shrink: true,
              }} */
              label=""
              value={formik.values.birthDate}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              color="secondary"
              name="address"
              required
              fullWidth
              id="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              color="secondary"
              name="country"
              required
              fullWidth
              id="country"
              label="Country"
              value={formik.values.country}
              onChange={formik.handleChange}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
          </Grid>
          {/* NUMERO DE CELULAR */}
          <Grid item xs={12} sm={6}>
            <FormControl>
              <InputLabel color="secondary" htmlFor="formatted-text-mask-input">
                Phone
              </InputLabel>
              <Input
                color="secondary"
                name="phone"
                id="formatted-text-mask-input"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl required className={classes.formControl}>
              <InputLabel htmlFor="outlined-gender-native-simple">
                Gender
              </InputLabel>
              <Select
                color="secondary"
                native
                inputProps={{
                  name: 'gender',
                  id: 'outlined-gender-native-simple',
                }}
                label="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                <option aria-label="None" value="" />
                <option value={0}>Male</option>
                <option value={1}>Female</option>
                <option value={2}>Prefer not to say</option>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Button xs={12} fullWidth variant="outlined" type="submit">
            Register
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default RegisterForm;
