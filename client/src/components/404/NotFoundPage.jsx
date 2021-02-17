import React from "react";
import { Alert } from "@material-ui/lab";
import toni from '../../assets/img/faroToni.jpg';
import { Button, Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    boxShadow: 'none',
    marginTop: 10,
  },
  button: {
    boxShadow: 'none',
    marginTop: 10,
  },
}));

const NotFoundPage = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Paper elevation={0}>
          <Alert severity="error">
            <img src={toni} alt="toni faro" />
          </Alert>
          <Button
            component={Link}
            to="/"
            className={classes.button}
          >
            Go Back
          </Button>
        </Paper>
      </div>
    </>
  );
};

export default NotFoundPage;
