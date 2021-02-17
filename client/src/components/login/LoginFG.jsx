import React from "react";
import Button from "@material-ui/core/Button";
import FacebookLogin from "./FacebookLogin";
import GoogleLogin from "./GoogleLogin";
import Grid from "@material-ui/core/Grid";

const LoginFG = () => {
  return (
    <>
    <Grid item>
        <Button
          variant="outlined"
          className="gmail-user"
          href="http://localhost:3001/auth/google"
        >
          <GoogleLogin fill="red" />
        </Button>
    </Grid>
    <Grid item>
      <Button
        variant="outlined"
        className="face-user"
        href="http://localhost:3001/auth/facebook"
      >
        <FacebookLogin fill="blue" />
      </Button>
    </Grid>  
      
    </>
  );
};

export default LoginFG;
