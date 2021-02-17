import React from 'react'
import ReactWhatsapp from 'react-whatsapp';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter'
import { Box, Grid,  Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  mainFooter: {
    color: theme.palette.secondary.main,
    padding: '1rem',
    marginTop: 'calc(5% + 0px)',
    flexGrow: 1,
    bottom: 0,
    
  },
  wsp: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    border: 'none',
    fontSize: "30px"
  },
  wsp2: {
    fontSize: "35px"
  },
  icons: {
    color: "primary",
    fontSize: '35px',
  },
  text: {
    color: 'inherit',
    textDecoration: 'none',

  },
  divider: {
    marginBottom: "20px"
  },
  click: {
    color: "inherit",
    textDecoration: "none"
  },
  list: {
    paddingInlineStart: "0px",
    color: "inherit",
    textDecoration: "none"
  }
}));

function Copyright() {
  const classes = useStyles();
  return (
    <Typography variant="body2" color="secondary" align="center">
      {"Copyright © "}
      <Link color="secondary" to={"/"} className={classes.click}>
        Clotheny
      </Link>{" "}
      | All rights reserved | Politics of Privacy{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  const classes = useStyles();

  return (
    <Box color="secondary" className={classes.mainFooter}>
      <Divider className={classes.divider}></Divider>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="flex-end"
      >
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="flex-start"
        >
          {/* column */}
          <Grid item>
            <Typography variant="h6">CLOTHENY</Typography>
            <ul className={classes.list}>
              <Typography
                className={classes.text}
                component={Link}
                to={"/about"}
              >
                About
              </Typography>
              <Typography>Payment terms</Typography>
              <Typography
                className={classes.text}
                component={Link}
                to={`/products`}
              >
                Shop
              </Typography>
              </ul>
          </Grid>
          {/* column */}
          <Grid item>
            <Typography variant="h6">HELP</Typography>
            <ul className={classes.list} >
              <Typography>FAQ</Typography>
              <Typography>Contact Us</Typography>
              <Typography>Find Us</Typography>
              </ul>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
          <Grid item><ReactWhatsapp
            className={classes.wsp}
            number="1-212-736-5000"
            message="Start chat"
            fontSize="large" 
          >
            <WhatsAppIcon color="secondary" className={classes.wsp2} />
          </ReactWhatsapp>
          </Grid>
          <Grid item>
          <a
            href="https://www.facebook.com/Magios-Shop"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon className={classes.icons} color="secondary" />
          </a>
          </Grid>

          <Grid item>      
          <a
            href="https://twitter.com/Magios-Shop"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon className={classes.icons} color="secondary" />
          </a>
          </Grid>
          <Grid item>
          <a
            href="https://www.instagram.com/Magios-Shop"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon className={classes.icons} color="secondary" />
          </a>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Copyright />
        </Box>
      </Grid>
    </Box>
  );
};

export default Footer