import { Card, Grid } from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import NavigationIcon from '@material-ui/icons/Navigation';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
   card: {
    maxWidth: "90%",
    margin: "auto",
    marginTop: "1rem",
    padding: "5%"
  },
  margin: {
    margin: theme.spacing(1),
  },
  inputs: {
      height: "50",
  }
}));

const EditUser = () => {
    let history = useHistory();
    const {userId} = useParams()
    const id = parseInt(userId)
    const [user, setUser] = useState({})

    useEffect(() => {
        axios.get(`/users/${id}`).then(res => {
            setUser(res.data)
        })
        // eslint-disable-next-line 
    }, [])
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
        name: user.name || "",
        lastName: user.lastName || "",
        address: user.address || "",
        birthDate: user.birthDate || 0,
        country: user.country || "" ,
        createdAt: user.createdAt || "" ,
        gender: user.gender || 0 ,
        phone: user.phone || "" ,
        dni: user.dni || "" ,
        role: user.role || 0 ,
        email:  user.email || "",
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            axios.post(`/users/edit/${id}`, values).then(res => {
            })
            history.push("/dashboard/listUsers");
        },
    })
    
    return (
        <>
         <Card className={classes.card}>
            <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
                <Grid container spacing={3} justify="center">
                    <Grid item xs={12} sm={4} >
                        <TextField
                            color="primary"
                            className={classes.inputs}
                            id="name"
                            label="Nombre"
                            name="name"
                            variant="outlined"
                            fullWidth
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <TextField
                            className={classes.inputs}
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            variant="outlined"
                            fullWidth
                            
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                                className={classes.inputs}
                                id="dni"
                                label="Dni"
                                name="dni"
                                variant="outlined"
                                fullWidth
                                
                                value={formik.values.dni}
                                onChange={formik.handleChange}
                            />                        
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            
                            id="address"
                            label="Address"
                            name="address"
                            variant="outlined"
                            fullWidth
                            value={formik.values.address}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            
                            id="country"
                            label="Country"
                            name="country"
                            variant="outlined"
                            fullWidth
                            value={formik.values.country}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl variant="outlined" fullWidth className={classes.mr}>
                            <InputLabel htmlFor="outlined-role-native-simple">Privileges</InputLabel>
                                <Select
                                native
                                value={formik.values.role}
                                onChange={formik.handleChange}
                                label="Privileges"
                                labelWidth={60}
                                inputProps={{
                                    name: 'role',
                                    id: 'outlined-role-native-simple',
                                }}
                                >
                                <option value={1}>Admin</option>
                                <option value={0}>User</option>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl variant="outlined" fullWidth className={classes.mr}>
                            <InputLabel htmlFor="outlined-gender-native-simple">Sex</InputLabel>
                                <Select
                                native
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                                label="Sex"
                                labelWidth={60}
                                inputProps={{
                                    name: 'gender',
                                    id: 'outlined-gender-native-simple',
                                }}
                                >
                                <option value={0}>Men</option>
                                <option value={1}>Women</option>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            
                            id="phone"
                            label="Phone"
                            name="phone"
                            variant="outlined"
                            fullWidth
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            
                            id="birthDate"
                            label="BirthDate"
                            name="birthDate"
                            variant="outlined"
                            fullWidth
                            value={formik.values.birthDate}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            disabled
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            disabled
                            id="createdAt"
                            name="createdAt"
                            label="Created At"
                            value={formik.values.createdAt.split("T")[0]}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item container xs={12} justify="flex-end">
                        <Fab
                            variant="extended"
                            size="small"
                            color="secondary"
                            aria-label="add"
                            className={classes.margin}
                            type="submit"
                            >
                            <NavigationIcon className={classes.extendedIcon} />
                            Actualizar
                        </Fab>
                    </Grid>
                </Grid>
            </form>
            </Card>
        </>
        )

}

export default EditUser
