  
import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Card, Grid } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import Select from '@material-ui/core/Select';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import AddCategoryComponent from './addCategoryComponent'
import AddPhotoComponent from './AddPhotosComponent'

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

const validationSchema = yup.object({
  name: yup
    .string('Enter product name')
    .min(1, 'Very short')
    .max(30, 'Very long, maximum 30 characters')
    .required('Name is required'),
  price: yup.number().min(1, 'Price cannot be 0').required('Price is required'),
  stock: yup
    .number()
    .min(1, 'Stock must be greater than 1')
    .required('Stock is required'),
  description: yup
    .string('Enter description')
    .min(20, 'Very short')
    .max(1800, 'Very long, maximum 1800 characters')
    .required('Description is required'),
});
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

const AddProductDashboard = () => {
    const [selectedPhotos, setSelectedPhotos] = useState([])
    const [reloadPhotos, setReloadPhotos] = useState(false)
    const [valueProp, setValueProp] = useState([]);
    const [value, setValue] = useState([]);
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
        name: "",
        price: 0,
        description: "",
        outstanding: 0, // 0 = false / 1 = true
        stock: 0,
        status: 1, // 0 = false / 1 = true
        //sale: 0, // 0 = false / 1 = true
        //category: [],
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            axios.post('/dashboard/addProduct', values)
            .then(res => {  
                let product = res.data
                valueProp.forEach(cat => {
                    axios.post(`/dashboard/products/${res.data.id}/category/${cat.id}`)
                })
                return product
                
            })
            .then(res => {  
                selectedPhotos.forEach(photo => {
                    axios.post(`/dashboard/${res.id}/image/${photo.id}`)
                })
                
            })
            formik.resetForm({})
            setSelectedPhotos([])
            setValueProp([])
            setValue([])
            setReloadPhotos(!reloadPhotos)
        },
        
    })

    const thumbs = selectedPhotos.map((file,i) => (
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
              <Grid item xs={12} sm={8}>
                <TextField
                  
                  className={classes.inputs}
                  required
                  id="name"
                  label="Name"
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
                <FormControl
                  className={classes.mr}
                  fullWidth
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Price
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    name="price"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
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
                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.mr}
                >
                  <InputLabel htmlFor="outlined-status-native-simple">
                    State
                  </InputLabel>
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
                    <option value={0}>Disable</option>
                    <option value={1}>Active</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl
                  variant="outlined"
                  fullWidth
                  className={classes.mr}
                >
                  <InputLabel htmlFor="outlined-outstanding-native-simple">
                    Featured
                  </InputLabel>
                  <Select
                    native
                    value={formik.values.outstanding}
                    onChange={formik.handleChange}
                    label="Featured"
                    labelWidth={60}
                    inputProps={{
                      name: 'outstanding',
                      id: 'outlined-features-native-simple',
                    }}
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Disable</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <AddCategoryComponent
                  setValueProp={setValueProp}
                  valueProp={valueProp}
                  value={value}
                  setValue={setValue}
                />
              </Grid>
              <Grid
                item
                container
                xs={12}
                justify={'center'}
                alignItems="center"
                spacing={3}
              >
                <Grid item xs={2}>
                  <AddPhotoComponent
                    selectedPhotos={selectedPhotos}
                    reloadPhotos={reloadPhotos}
                    setSelectedPhotos={setSelectedPhotos}
                  />
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item container xs={9}>
                  <aside style={thumbsContainer}>{thumbs}</aside>
                </Grid>
              </Grid>
              {/*  {Agregar  funcionalidad para insertarle categorias al producto} */}
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
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
                  Add Product
                </Fab>
              </Grid>
            </Grid>
          </form>
        </Card>
      </>
    );
}
export default AddProductDashboard