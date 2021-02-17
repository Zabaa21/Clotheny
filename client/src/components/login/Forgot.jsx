import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';

const validationSchema = yup.object({
  email: yup
    .string("email")
    .email("invalid email address")
    .required("email is required"),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Forgot = () => {
  const history = useHistory();
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (value) => {
        axios
        .post("/login/forgot", {
          'email': value.email,     
        })
        .then((res) => {
          Swal.fire('Hey!', `
              Check your email inbox and follow the instructions<br>        
              `, res);
          formik.resetForm({});
            history.push("/login/reset");

        })
        .catch((error) => {
          Swal.fire('Oops...', `
              Invalid email address<br>        
              `, error);
        });
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" >
          Reset Password
        </Typography>
        <Typography className={classes.paper}> Please write your email address, click reset and then verify your inbox email and follow the instructions </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
            <TextField
            color="secondary"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
            Reset
          </Button>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}
export default Forgot