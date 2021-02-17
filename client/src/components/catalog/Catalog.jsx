import { Accordion, Box, Grid} from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import Pagination from '../pagination/Pagination';
import ProductCards from '../product/ProductCards';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    paginate: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(5)
    },  
    padding: {
      marginTop: theme.spacing(3)
    },
    paddingTitle: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(3)
    },
}))

// El Catalogo muestra una grilla de Componentes ProductCard.
// Recibe por props un arreglo de productos.

const Catalog = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const { idCat, name } = useParams();
  const [productsEachPage] = useState(6); // Cuantos items renderiza por pagina
  const [currentPage, setCurrentPage] = useState (1); // setea el valor de la pagina
  const searchProduct = useSelector((state) => state.productReducer.product);

  useEffect(() => {
    if (idCat) {
      setCurrentPage(1);
      axios.get(`/products/category/${idCat}`).then((res) => {
        setProducts(res.data[0].products);
      });
    } else if (name) {
      setProducts(searchProduct);
    } else {
      setCurrentPage(1);
      axios.get("/products").then((res) => {
        setProducts(res.data);
      });
    }
    setCurrentPage(1);
    axios.get("/categories").then((res) => setCategories(res.data));
  }, [idCat, name, searchProduct]);

  //PAGINACION
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //Contador de productos totales por pagina
  const indexOfLastPost = currentPage * productsEachPage;
  const indexOfFirstPost = indexOfLastPost - productsEachPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsEachPage); i++) {
    pageNumbers.push(i);
  }
    
  return (
    <>
      <Grid container>
        
        <Grid item xs={12} md={2} lg={2}>
          <Accordion defaultExpanded>
            <AccordionSummary
            
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>CATEGORIES</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
              >
                <Grid item>
                  <List component="nav">
                    {categories &&
                      categories.map((element, index) => {
                        return (
                          <div key={index}>
                            <ListItem
                              button
                              component={Link}
                              to={`/products/category/${element.id}`}
                            >
                              <ListItemText primary={element.name} />
                            </ListItem>
                          </div>
                        );
                      })}

                    <Divider></Divider>
                    <ListItem button component={Link} to={`/products`}>
                      <ListItemIcon>
                        <ViewModuleIcon />
                      </ListItemIcon>
                      <ListItemText primary={"View All Products"} />
                    </ListItem>
                    <Divider></Divider>
                  </List>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>

        <Grid item xs={12} md={10} lg={10} className={classes.padding}>
          <ProductCards products={currentPosts} />
        </Grid>

      </Grid>
      {/* ACTUALIZACION PAGINATE */}
      <Box className={classes.paginate}>
        <Pagination totalPages={pageNumbers.length} paginate={paginate} />
      </Box>
    </>
  );
};

export default Catalog;