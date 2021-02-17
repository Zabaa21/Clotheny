import React from "react";
import ProductCard from "./ProductCard";
import { Grid } from "@material-ui/core";

//Acá le tiramos la data del fetch
function ProductCards({products}) {

  return (
      <Grid item container>
      <Grid item xs={false} sm={1} />
      <Grid item xs={12} sm={10}>
        <Grid container spacing={3}>
          {products && products.map((product) =>{return (
            <Grid key={product.id} container item justify="center" xs={12} sm={6} md={4}> 
              <ProductCard key={product.id} product={product} />
            </Grid>)
          })}
          </Grid>
        </Grid>
      <Grid item xs={false} sm={1}/>
    </Grid>
/*     
      <Grid item container>
        <Grid item xs={12} sm={10}>
          <Grid container spacing={1}>
            {products &&
              products.map((p) => {
                return (
                  <Grid item key={p.id} xs={12} sm={4}>
                    <ProductCard product={p}/>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Grid> */
  );
}

export default ProductCards;