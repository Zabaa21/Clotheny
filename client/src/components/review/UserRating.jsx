import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';


export default function UserRating(value) {
  return (
    <Grid>
      <Box component="fieldset" ml={2} pt={0} borderColor="transparent">
        <Rating name="read-only" value={value.rating} readOnly />
      </Box>
    </Grid>
  );
}
