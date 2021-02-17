import { Grid, Typography, Paper, Divider, TextField, Button } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { SocialIcon } from 'react-social-icons';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Swal from 'sweetalert2';
import {henrys} from '../../../services/contactDb'

const validationSchema = yup.object({
    name: yup
      .string("Enter your name")
      .min(1, "Invalid name")
      .required("The name is required"),
    email: yup
      .string("Your email")
      .email("Invalid Email")
      .required("The email is required"),
    message: yup
    .string("Your message")
    .min(10, "Your message is too short")
    .required("The message is required")
  });

const useStyles = makeStyles( (theme) => ({
    spacing: {
        marginTop: "25px",
        marginBottom: "25px"
    },
    margin: {
        marginBottom: "15px"
    },
    contact: {
        marginTop: "25px",
        marginBottom: "25px",
        marginLeft: "10px"
    },
    show: {
        dispaly: "block"
    },
    hidden: {
        display: "none"
    },
    photoDetail: {
      borderRadius: "200px 200px 200px 200px",
      MozBorderRadius: "200px 200px 200px 200px",
      WebkitBorderRadius: "200px 200px 200px 200px",
      border: "0px solid #000000"
    }
}));

export default function Det() {
    const data = henrys.henrys.agus
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
          name: "",
          lastname: "",
          email: "",
          message: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
         axios
            .post('/ajaime', values)
            .then(formik.resetForm({}), Swal.fire({
                            icon: "success",
                            title:'Message sent !',
                            text: 'Thanks for contact me'
                        }) )
            // .then(() => {
            //     if(!sent) {
            //         Swal.fire({
            //             icon: "success",
            //             title:'Message sent !',
            //             text: 'Thanks for contact me'
            //         })
            //     } else {
            //         Swal.fire({
            //             icon: "error",
            //             title:'Message sent !',
            //             text: 'Thanks for contact me'
            //         })
            //     }
            // })
            .catch(err => {
                console.log("el error es aca: ", err)
            })
        }
    })

    return (
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={1} sm={2} lg={2}></Grid>

        <Grid
          item
          container
          xs={10}
          sm={8}
          lg={8}
          direction="column"
          justify="space-evenly"
          alignItems="stretch"
          className={classes.spacing}
        >
          <Paper elevation={2}>
            <Grid
              container
              direction="row"
              justify="space-evenly"
              alignItems="stretch"
              className={classes.spacing}
            >
              <Grid item>
                <img
                  src="https://res.cloudinary.com/damdqkgms/image/upload/v1613073901/1600286230629_vw8yxj.jpg"
                  border="0"
                  height="150px"
                  weight="150px"
                  className={classes.photoDetail}
                  alt="true"
                  position="relative"
                ></img>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="flex-start"
                  spacing={2}
                >
                  <Grid item>
                    <Typography variant="h3" color="secondary">
                      {data.name}
                    </Typography>
                  </Grid>
                  <Grid item className={classes.margin}>
                    <Typography color="secondary">Age: {data.Age}</Typography>
                  </Grid>
                  <Grid item className={classes.margin}>
                    <Typography color="secondary">Country: {data.Country}</Typography>
                  </Grid>
                  <Grid item className={classes.margin}>
                    <Typography color="secondary">Email: {data.email}</Typography>
                  </Grid>
                </Grid>

                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                  spacing={5}
                >
                  {" "}
                  <Grid item>
                    <SocialIcon
                      target="blank"
                      url="https://www.linkedin.com/in/agustin-diego-jaime-4033041b7/"
                      style={{ height: 35, width: 35 }}
                    />
                  </Grid>
                  <Grid item>
                    <SocialIcon
                    target="blank"
                      url="http://twitter.com/"
                      style={{ height: 35, width: 35 }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
          >
            <Grid item>
              <Typography
                variant="h4"
                color="secondary"
                className={classes.spacing}
              >
                Personal Experience
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta nam harum, ipsa quod, necessitatibus cupiditate quaerat accusamus repellat ratione laudantium aut praesentium corrupti aspernatur adipisci eius quam minima nesciunt consequatur? Id sunt nostrum quas quisquam deserunt nulla rerum est cumque consequuntur praesentium quaerat, dolor accusamus minus nesciunt repellendus, similique quae non vero temporibus et dignissimos distinctio consectetur soluta. Laboriosam, sequi eos? Esse porro voluptatem eveniet dolores eligendi minus ipsam eaque. Aperiam voluptatibus iusto odio sed, maiores tempora dignissimos laudantium, facilis recusandae animi quidem ullam beatae cumque expedita quae eum mollitia, rem voluptas earum amet architecto vel veritatis quibusdam! Qui, quia.
              </Typography>
            </Grid>
          </Grid>
          <Divider className={classes.spacing}></Divider>

          {/* FORMULARIO DE CONTACTO */}
         
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            
          >
          <Paper elevation={2} >
              <Grid item>
                <Typography variant="h4" color="secondary" className={classes.contact}>
                  Contact Me
                </Typography>
              </Grid>
              <form onSubmit={formik.handleSubmit}>
                <Grid
                  item
                  container
                  direction="row"
                  justify="center"
                  alignItems="flex-start"
                
                  spacing={3}
                >
                  <Grid item xs={12} sm={5} lg={5} >
                    <TextField
                      color="secondary"
                      autoComplete="name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      variant="outlined"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5} lg={5}>
                    <TextField
                      color="secondary"
                      autoComplete="lastname"
                      name="lastname"
                      required
                      fullWidth
                      id="lastname"
                      variant="outlined"
                      label="Lastname"
                      value={formik.values.lastname}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.lastname &&
                        Boolean(formik.errors.lastname)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={10} lg={10}>
                    <TextField
                      color="secondary"
                      autoComplete="email"
                      name="email"
                      required
                      fullWidth
                      id="email"
                      label="Email"
                      variant="outlined"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={10} lg={10}>
                    <TextField
                    multiline
                    rows={6}
                    rowsMax={8}
                      color="secondary"
                      autoComplete="message"
                      name="message"
                      required
                      fullWidth
                      id="message"
                      label="Your message..."
                      variant="outlined"
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      error={formik.touched.message && Boolean(formik.errors.message)}
                    />
                  </Grid>
                </Grid>
                <Grid container className={classes.spacing} direction="row"
  justify="center"
  alignItems="center">
                  <Button type="submit" variant="outlined" color="secondary">Send a Message</Button>
                  </Grid>
                  
              </form>
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={1} sm={2} lg={2}></Grid>
      </Grid>
    );
}
