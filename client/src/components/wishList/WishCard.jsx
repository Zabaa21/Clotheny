import React from 'react';
import { Box } from '@material-ui/core';
import WishDetail from './WishDetail';

const WishCard = (product) => {
  return (
    <div>
      {product.data && product.data.map((element, index) => {
        return (
          <Box>
            <WishDetail data={element} key={element.id} />
          </Box>
        );
      })}
    </div>
  );
};
export default WishCard;
