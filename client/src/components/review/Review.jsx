import {Box} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReviews } from '../../redux/reviewsReducer/actionsReviews';
import { makeStyles } from '@material-ui/core/styles';
import { ReviewCard } from './ReviewCard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    boxShadow: "none",
  },
  media: {
    height: 140,
  },
  padding: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(3),
    
  },
  avatar: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(10),
  },
  author: {
    marginTop: theme.spacing(1),
  },
  rating: {
    marginleft: theme.spacing(8),
  },
}));

const Review = (props) => {
  // const isLogged = useSelector((state) => state.loginReducer.isLogged);
  const allReviews = useSelector((state) => state.reviewsReducer.reviews);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = props; // id de Producto

  useEffect(() => {
    dispatch(getReviews(id));
    //eslint-disable-next-line
  }, []);

  return (
    <Box className={classes.root}>
        {allReviews &&
          allReviews.map((review) => {
            return (
              <ReviewCard review={review} key={review.id} />
            );
          })}
    </Box>
  );
};

export default Review;
