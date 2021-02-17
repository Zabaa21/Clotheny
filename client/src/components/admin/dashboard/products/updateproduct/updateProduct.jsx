import { Card, Grid } from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import NavigationIcon from '@material-ui/icons/Navigation';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import AssociateCategory from './AssociateCategory.jsx';
import AssociateImg from "./AssociateImg";

const validationSchema = yup.object({
    name: yup
    .string('Ingresa el nombre del producto')
    .min(5, 'Muy corto')
    .max(30, 'Muy largo, maximo 30 caracteres')
    .required('El nombre es obligatorio'),
    price: yup
    .number()
    .min(1,"El precio no puede ser 0")
    .required('El precio es obligatorio'),
    stock: yup
    .number()
    .min(1,"El stock tiene que ser mayor a 1")
    .required('El Stock es obligatorio'),
    description: yup
    .string('Ingrese la descripcion')
    .min(20, 'Muy corto')
    .max(1800, 'Muy largo, maximo 1800 caracteres')
    .required("La descripcion es un requisito"),
});

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'relative',
    width: 'auto',
    height: '100%'
  };

const useStyles = makeStyles((theme) => ({
   card: {
    maxWidth: "90%",
    margin: "auto",
    marginTop: "1rem",
    padding: "1%"
  },
  margin: {
    margin: theme.spacing(1),
  },
  inputs: {
      height: "50",
  }
}));

const updateProduct = (data, id) => {
const {name,price,description,outstanding,stock,status} = data;
let updateNewForm = {id,name,price,description,outstanding,stock,status}

    axios.post('http://localhost:3001/dashboard/updateProduct', updateNewForm)
}

const UpdateProduct = () => {
    const {productName} = useParams()
    const id = parseInt(productName)
    const [product, setProduct] = useState({})
    const listPhotos = () => {
        axios.get(`http://localhost:3001/dashboard/image/${id}`).then((res) => {
            setPhotos(res.data[0].images)
        })
      }

    useEffect(() => {
        axios.get(`/products/${id}`).then(res => {
            setProduct(res.data)}).then(res => listPhotos())
        }
        // eslint-disable-next-line
        ,[])

    const [photos, setPhotos] = useState([])
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
        name: product.name || "",
        price: product.price || "",
        description: product.description || "",
        outstanding: product.outstanding, // 0 = false / 1 = true
        stock: product.stock || "" ,
        status:  product.status, // 0 = false / 1 = true
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            updateProduct(values,id)
            window.location = "/dashboard/listProducts";
        },
    })
    
    const thumbs = photos.map((file,i) => (
      <div key={i}>
          <div style={thumb} >
              <div style={thumbInner}> 
                  <img key={`imagen-${i}`} src={file.url} style={img}alt={""}/>
              </div>
          </div>
      </div>
    ));  

    return (
        <>
         <Card className={classes.card}>
            <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
                <Grid container spacing={3} justify="center">
                    <Grid item xs={12} sm={8} >
                        <TextField
                            className={classes.inputs}
                            required
                            id="name"
                            label="Nombre"
                            name="name"
                            variant="outlined"
                            fullWidth
                            
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl  className={classes.mr}  fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-amount">Precio</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                name="price"
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                labelWidth={60}
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                error={formik.touched.price && Boolean(formik.errors.price)}
                            />
                        </FormControl>                        
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            required
                            id="stock"
                            label="Stock"
                            name="stock"
                            variant="outlined"
                            fullWidth
                            value={formik.values.stock}
                            onChange={formik.handleChange}
                            error={formik.touched.stock && Boolean(formik.errors.stock)}
                            helperText={formik.touched.stock && formik.errors.stock}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl variant="outlined" fullWidth className={classes.mr}>
                            <InputLabel htmlFor="outlined-status-native-simple">Estado</InputLabel>
                                <Select
                                native
                                value={formik.values.status}
                                onChange={formik.handleChange}
                                label="status"
                                labelWidth={60}
                                inputProps={{
                                    name: 'status',
                                    id: 'outlined-status-native-simple',
                                }}
                                >
                                <option value={1}>Active</option>
                                <option value={0}>Disable</option>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl variant="outlined" fullWidth className={classes.mr}>
                            <InputLabel htmlFor="outlined-outstanding-native-simple">Destacado</InputLabel>
                                <Select
                                native
                                value={formik.values.outstanding}
                                onChange={formik.handleChange}
                                label="Destacado"
                                labelWidth={60}
                                inputProps={{
                                    name: 'outstanding',
                                    id: 'outlined-outstanding-native-simple',
                                }}
                                >
                                <option value={1}>Active</option>
                                <option value={0}>Disable</option>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <AssociateCategory productId={id}/>
                    </Grid>
                    <Grid item container xs={12} justify={"center"} alignItems="center" spacing={3}>
                        <Grid item xs={2}>
                            <AssociateImg productId={id} listPhotos={listPhotos} setActualPhotos={setPhotos} actualPhotos={photos}/>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item container xs={9}>
                            <aside style={thumbsContainer}>
                                {thumbs}
                            </aside>
                        </Grid>
                    </Grid> 
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Descripcion"
                            name="description"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
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

export default UpdateProduct