import React from 'react';
import Box from '@material-ui/core/Box';
import { Avatar, Button, Container, CssBaseline, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

  const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    boxShadow: "none",
    padding: theme.spacing(5),
  },
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: 'center',
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

  const validationSchema = yup.object({
    email: yup
      .string("email")
      .email("invalid email address")
      .required("Email is required"),
    newPassword: yup
      .string("password")
      .required("Password is required"),
    token: yup
      .number()
      .min(6)
      .required("Token is required")
  });

  export default function ResetPassword() {
    const classes = useStyles();
    let history = useHistory();
    const formik = useFormik({
        initialValues: {
          email: "",
          token: "",
          newPassword: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          axios
            .post(`/login/reset?token=${values.token}`, {password : values.newPassword})
            .then((res) => {
              Swal.fire('Congrats!', `
              Password has been reseted<br>        
              `);
              history.push("/login");
            })
            .catch((error) => {
              Swal.fire('Oops...', `
              Token is wrong<br>        
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
        <Typography component="h1" variant="h5">Reset Password Form</Typography>
        <Typography className={classes.paper}>"Please insert your email address, your token (check your email inbox) and then your new password"</Typography>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
                <TextField color="secondary"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            label="Email">Email</TextField>
        <TextField color="secondary"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="token"
            value={formik.values.token}
            onChange={formik.handleChange}
            label="Token">Token</TextField>
        <TextField color="secondary"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            type="password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            label="New Password">New Password</TextField>
        <Button variant="contained" fullWidth className={classes.submit} color="primary" type='submit' >
                Send
        </Button>
        </form>  
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}