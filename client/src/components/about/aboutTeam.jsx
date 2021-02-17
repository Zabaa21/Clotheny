import React, { useState } from 'react'
import { Grid, Typography, Card, CardContent, CardActionArea, Grow, Paper, Zoom } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import "./aboutTeam.css"
import {useHistory} from 'react-router-dom'
import { SocialIcon } from 'react-social-icons';
import {henrys} from '../../services/contactDb'
import {imgHenry} from '../../services/contactDb'

const useStyles = makeStyles((theme) => ({
  padding: {
    marginLeft: "50px",
  },
  paper: {
    margin: theme.spacing(4),
  },
  text: {
    marginTop: theme.spacing(2),
    "&:hover": {
      color: "orange",
    },
  },
  tittle: {
    margin: theme.spacing(2),
    position: "relative",
    fontSize: "5vh",
    webkitTextStroke: "0.1vw secondary",
    
  },
  ig: {
    bgColor: "#ff5a01",
  },
}));

export default function AboutTeam() {
  const henryImg = imgHenry.img
  const data = henrys.henrys
  const classes = useStyles();
  const [checked] = useState(true);
  const [checkIconOne, setCheckOne] = useState(false);
  const [checkIconTwo, setCheckTwo] = useState(false);
  const [checkIconThree, setCheckThree] = useState(false);
  const [checkIconFour, setCheckFour] = useState(false);
  const [checkIconFive, setCheckFive] = useState(false);
  const [checkIconSix, setCheckSix] = useState(false);
  const history = useHistory();

  const handleChangeIconsCardOne = () => {
    setCheckOne((prev) => !prev);
  };
  const handleChangeIconsCardTwo = () => {
    setCheckTwo((prev) => !prev);
  };
  const handleChangeIconsCardThree = () => {
    setCheckThree((prev) => !prev);
  };
  const handleChangeIconsCardFour = () => {
    setCheckFour((prev) => !prev);
  };
  const handleChangeIconsCardFive = () => {
    setCheckFive((prev) => !prev);
  };
  const handleChangeIconsCardSix = () => {
    setCheckSix((prev) => !prev);
  };

  //contenedor de componente cards
  return (
    <Grid container direction="row" justify="space-between" alignItems="center" checked={checked}>
      <Grid xs={2} sm={2} lg={2} item></Grid>
      <Grid item container xs={6} sm={6} lg={6}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Typography color="secondary" variant="h2" className={classes.tittle} spacing={2} >Henry Team</Typography>
        </Grid>
        <Grid
          container
          spacing={4}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grow in={checked} style={{ transformOrigin: "0 0 0" }}>
            <Paper elevation={4} className={classes.paper}>
              <Grid item>
                <Card className={classes.root} >
                  <CardActionArea>
                    <CardContent checked={checkIconOne} onMouseEnter={handleChangeIconsCardOne} onMouseLeave={handleChangeIconsCardOne}>
                        <div className="transition">
                      <img
                        src={data.gordo.img}
                        border="0"
                        height="150px"
                        weight="150px"
                        className="imgShow"
                        alt="true"
                        position="relative"

                      /> 
                      <img
                      // eslint-disable-next-line
                      alt="true"
                      src={henryImg}
                      className="momentImg"
                      height="150px"
                      weight="150px"
                      ></img>
                        </div>
                        {/* CONTENEDOR DE ICONOS REDES SOCIALES */}
                        <Zoom in={checkIconOne} >
                      <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="flex-end"
                      spacing={2}
                    >
                      {" "}
                      <Grid item className={classes.linkdn}>
                        <SocialIcon
                        target="blank"
                          url="https://www.linkedin.com/in/siri-facundo/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                      <Grid item className={classes.twitter}>
                        <SocialIcon     
                        target="blank"  
                          url="http://twitter.com/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                    </Grid>
                     {/* CONTENEDOR DE ICONOS REDES SOCIALES */}
                     </Zoom>
                      <Grid container direction="row" justify="center">
                        <Typography
                          className={classes.text}
                          onMouseOver={() => {}}
                          onClick={() => history.push(`/Facundo-A-Siri`)}
                        >
                          {data.gordo.name}
                        </Typography>
                      </Grid>
                    </CardContent>
                  </CardActionArea>

                </Card>
              </Grid>
            </Paper>
          </Grow>

          <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 1000 } : {})}>
          <Paper elevation={4} className={classes.paper}>
          <Grid item>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent checked={checkIconTwo} onMouseEnter={handleChangeIconsCardTwo} onMouseLeave={handleChangeIconsCardTwo}>
                    <div className="transition">
                      <img
                        src={data.jere.img}
                        border="0"
                        height="150px"
                        weight="150px"
                        className="imgShow"
                        alt="true"
                        position="relative"

                      /> 
                      <img
                      alt="true"
                      src={henryImg}
                      className="momentImg"
                      height="150px"
                      weight="150px"
                      ></img>
                        </div>

                        {/* CONTENEDOR DE ICONOS REDES SOCIALES */}
                        <Zoom in={checkIconTwo} >
                      <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="flex-end"
                      spacing={2}
                    >
                      {" "}
                      <Grid item className={classes.linkdn}>
                        <SocialIcon
                        target="blank"
                          url="https://www.linkedin.com/in/jeremias-santochi/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                     <Grid item className={classes.twitter}>
                        <SocialIcon    
                        target="blank"   
                          url="http://twitter.com/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                    </Grid>
                     {/* CONTENEDOR DE ICONOS REDES SOCIALES */}
                     </Zoom>
                      <Grid container direction="row" justify="center">
                        <Typography
                          className={classes.text}
                          onMouseOver={() => {}}
                          onClick={() => history.push(`/Jeremias-Santochi`)}
                        >
                          {data.jere.name}
                        </Typography>
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Paper>
          </Grow>

        <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 1500 } : {})}>
          <Paper elevation={4} className={classes.paper}>
          <Grid item>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent checked={checkIconThree} onMouseEnter={handleChangeIconsCardThree} onMouseLeave={handleChangeIconsCardThree}>
                    <div className="transition">
                      <img
                        src={data.zaba.img}
                        border="0"
                        height="150px"
                        weight="150px"
                        className="imgShow"
                        alt="true"
                        position="relative"
                      /> 
                      <img
                      alt="true"
                      src={henryImg}
                      className="momentImg"
                      height="150px"
                      weight="150px"
                      ></img>
                        </div>

                        {/* CONTENEDOR DE ICONOS REDES SOCIALES */}
                        <Zoom in={checkIconThree} >
                      <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="flex-end"
                      spacing={2}
                    >
                      {" "}
                      <Grid item className={classes.linkdn}>
                        <SocialIcon
                        target="blank"
                          url="https://www.linkedin.com/in/nicolas-zabattaro/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                      <Grid item className={classes.twitter}>
                        <SocialIcon   
                        target="blank"    
                          url="http://twitter.com/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                    </Grid>
                     {/* CONTENEDOR DE ICONOS REDES SOCIALES */}
                     </Zoom>
                      <Grid container direction="row" justify="center">
                        <Typography
                          className={classes.text}
                          onMouseOver={() => {}}
                          onClick={() => history.push(`/Nicolas-Zabattaro`)}
                        >
                          {data.zaba.name}
                        </Typography>
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Paper>
          </Grow>

        <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 2000 } : {})}>
          <Paper elevation={4} className={classes.paper}>
          <Grid item>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent checked={checkIconFour} onMouseEnter={handleChangeIconsCardFour} onMouseLeave={handleChangeIconsCardFour}>
                    <div className="transition">
                      <img
                        src={data.agus.img}
                        border="0"
                        height="150px"
                        weight="150px"
                        className="imgShow"
                        alt="true"
                        position="relative"

                      /> 
                      <img
                      alt="true"
                      src={henryImg}
                      className="momentImg"
                      height="150px"
                      weight="150px"
                      ></img>
                        </div>

                        {/* CONTENEDOR DE ICONOS REDES SOCIALES */}
                        <Zoom in={checkIconFour} >
                      <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="flex-end"
                      spacing={2}
                    >
                      {" "}
                      <Grid item className={classes.linkdn}>
                        <SocialIcon
                        target="blank"
                          url="https://www.linkedin.com/in/agustin-diego-jaime-4033041b7/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                      <Grid item className={classes.twitter}>
                        <SocialIcon   
                        target="blank"    
                          url="http://twitter.com/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                    </Grid>
                     {/* CONTENEDOR DE ICONOS REDES SOCIALES */}
                     </Zoom>
                      <Grid container direction="row" justify="center">
                        <Typography
                          className={classes.text}
                          onMouseOver={() => {}}
                          onClick={() => history.push('/Agustin-Diego-Jaime')}
                        >
                          {data.agus.name}
                        </Typography>
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Paper>
          </Grow>

        <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 2500 } : {})}>
          <Paper elevation={4} className={classes.paper}>
          <Grid item>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent checked={checkIconFive} onMouseEnter={handleChangeIconsCardFive} onMouseLeave={handleChangeIconsCardFive}>
                    <div className="transition">
                      <img
                        src={data.facu.img}
                        border="0"
                        height="150px"
                        weight="150px"
                        className="imgShow"
                        alt="true"
                        position="relative"
// eslint-disable-next-line
                      /> 
                      <img
                      alt="true"
                      src={henryImg}
                      className="momentImg"
                      height="150px"
                      weight="150px"
                      ></img>
                        </div>

                        {/* CONTENEDOR DE ICONOS REDES SOCIALES */}
                        <Zoom in={checkIconFive} >
                      <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="flex-end"
                      spacing={2}
                    >
                      {" "}
                      <Grid item className={classes.linkdn}>
                        <SocialIcon
                        target="blank"
                          url="https://www.linkedin.com/in/fmarilao/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                      <Grid item className={classes.twitter}>
                        <SocialIcon     
                        target="blank"  
                          url="http://twitter.com/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                    </Grid>
                     {/* CONTENEDOR DE ICONOS REDES SOCIALES */}
                     </Zoom>
                      <Grid container direction="row" justify="center">
                        <Typography
                          className={classes.text}
                          onMouseOver={() => {}}
                          onClick={() => history.push(`/Facundo-Marilao`)}
                        >
                          {data.facu.name}
                        </Typography>
                      </Grid>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Paper>
          </Grow>


        <Grow in={checked} style={{ transformOrigin: '0 0 0' }}
          {...(checked ? { timeout: 3000 } : {})}>
          <Paper elevation={4} className={classes.paper}>
          <Grid item>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent checked={checkIconSix} onMouseEnter={handleChangeIconsCardSix} onMouseLeave={handleChangeIconsCardSix}>
                    <div className="transition">
                      <img
                        src={data.carlos.img}
                        border="0"
                        height="150px"
                        weight="150px"
                        className="imgShow"
                        alt="true"
                        position="relative"
                      /> 
                      <img
                      alt="true"
                      src={henryImg}
                      className="momentImg"
                      height="150px"
                      weight="150px"
                      ></img>
                        </div>

                        {/* CONTENEDOR DE ICONOS REDES SOCIALES */}
                        <Zoom in={checkIconSix} >
                      <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="flex-end"
                      spacing={2}
                    >

                      <Grid item className={classes.linkdn}>
                        <SocialIcon
                        target="blank"
                          url="https://www.linkedin.com/in/cramirezl11"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                      <Grid item className={classes.twitter}>
                        <SocialIcon    
                        target="blank"   
                          url="http://twitter.com/"
                          style={{ height: 35, width: 35 }}
                        />
                      </Grid>
                    </Grid>
                     {/* CONTENEDOR DE ICONOS REDES SOCIALES */}
                     </Zoom>
                      <Grid container direction="row" justify="center">
                        <Typography
                          className={classes.text}
                          onMouseOver={() => {}}
                          onClick={() => history.push(`/Carlos-Ramirez`)}
                        >
                          {data.carlos.name}
                        </Typography>
                      </Grid>
                    </CardContent>
                  </CardActionArea>

                </Card>
              </Grid>
            </Paper>
          </Grow>

        </Grid>
      </Grid>
      <Grid xs={2} sm={2} lg={2} item></Grid>
    </Grid>
  );
}