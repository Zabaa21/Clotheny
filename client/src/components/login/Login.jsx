import React from 'react';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Swal from 'sweetalert2'
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt from "jsonwebtoken";
import {setUser} from '../../redux/loginReducer/actionLogin.js'
import { Link as RouterLink } from 'react-router-dom';
import LoginFG from "./LoginFG.jsx";

const validationSchema = yup.object({
  email: yup
    .string("email")
    .email("invalid email address")
    .required("email is required"),
  password: yup
    .string("password")
    .required("password is required"),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post("/login/", values)
        .then((res) => {
          if (res.data.message) {
            Swal.fire('Oops...', `${res.data.message}`, 'error')
          } 
          else {
            const token = res.data;
            const user = jwt.decode(token);
            localStorage.setItem("token", token);
            dispatch(setUser(user));
            formik.resetForm({});
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            history.push('/')
          }
        })
        .catch((error) => {
          Swal.fire('Oops...', `${error}`, 'error')
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
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
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
          <TextField
            color="secondary"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="secondary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
                    <Button 
                          type="button" 
                          color='secondary' 
                          component={RouterLink}
                          to={'/login/forgot'}
                          >
                          Forgot your password?
                    </Button>
            </Grid>
            <Grid item>
              <Button
              component={RouterLink}
              to={'/register'}
              type="button" 
              color="secondary"
              >Don't have an account? Register now
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row">
            <Grid item container justify="center" spacing={2}>
              <LoginFG />
            </Grid>
          </Grid>
            
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}
