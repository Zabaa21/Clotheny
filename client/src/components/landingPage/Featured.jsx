import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import {getOutstanding} from '../../redux/featuredReducer/actionOutstanding'
import GridListTileBar from '@material-ui/core/GridListTileBar';
import {Link as RouterLink} from "react-router-dom" 

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '90%',
    height: '100%',
  },
}));

export default function ImageGridList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const productOutstanding = useSelector(
    (state) => state.outstandingReducer.outstanding
  );

   useEffect(() => {
     dispatch(getOutstanding());
     //eslint-disable-next-line
   }, []);

 return (
   <div className={classes.root}>
     <GridList cellHeight={300} className={classes.gridList} cols={3}>
       {productOutstanding &&
         productOutstanding.map(
           (tile) =>
             tile.images.length && (
               <GridListTile
                 component={RouterLink}
                 to={`/product/${tile.id}`}
                 cols={tile.cols || 1}
                 key={tile.id}
               >
                 <img src={tile.images[0].url} alt={tile.description} />
                 <GridListTileBar
                   title={tile.title}
                   subtitle={<h3>NEW ARRIVALS</h3>}
                 />
               </GridListTile>
             )
         )}
     </GridList>
   </div>
 );
}

