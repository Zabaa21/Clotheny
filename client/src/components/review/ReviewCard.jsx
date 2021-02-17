import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Grid, Avatar, Typography, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserRating from './UserRating';

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

export const ReviewCard = ({review}) => {
    
    const [author, setAuthor] = useState('');
    const classes = useStyles();

    useEffect(() => {
        axios.get(`/users/${review.userId}`).then((res) => {
        setAuthor(res.data);
      })
      // eslint-disable-next-line
    }, []);

    return (
        <div>
            <Grid>             
                <Grid item className={classes.padding} >
                  <Card>
                    <Avatar
                      className={classes.avatar}
                      alt="AvatarIMG"
                      src={author.image}
                    />
                    <Typography
                      className={classes.author}
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      align="center"
                    >
                      {author.name + ' ' + author.lastName}
                    </Typography>
                    <CardContent>
                      <UserRating
                        rating={review.rating}
                        className={classes.rating}
                      />
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        align="center"
                      >
                        {review.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
        </div>
    )
}
