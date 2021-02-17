import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import axios from 'axios'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));
const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  
  const img = {
    display: 'relative',
    width: 'auto',
    height: '100%'
  };

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddPhotoComponent({ selectedPhotos, setSelectedPhotos, reloadPhotos }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [photos, setPhotos] = useState([])

  const listAllPhotos = () => {
    axios.get('http://localhost:3001/dashboard/listPhotos').then(res => setPhotos(res.data))
  }

  useEffect(listAllPhotos,[reloadPhotos])

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  // eslint-disable-next-line 
  const thumbs = photos && photos.map((file,i) => 
  { return (
            <div key={i}>
                <div style={thumb} >
                    <div style={thumbInner} onClick={() => {
                        setSelectedPhotos([...selectedPhotos, file])
                        setPhotos(photos.filter((newFile) => file.id !== newFile.id))
                        }}> 
                        <img key={file.name} src={file.url} style={img}alt={""}/>
                    </div>
                </div>
            </div>
        )
});

  const thumbsPhotosSelected = selectedPhotos.map((file,i) => (
    <div key={i}>
        <div style={thumb} >
            <div style={thumbInner} onClick={() => {
                setSelectedPhotos(selectedPhotos.filter((newFile) => file.id !== newFile.id))
                setPhotos([...photos, file])
                }}> 
                <img key={file.name} src={file.url} style={img}alt={""}/>
            </div>
        </div>
    </div>
  ));
  return (
    <div>
        <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
            onClick={handleClickOpen}>
            Photos
        </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Photos
            </Typography>
            <Button autoFocus color="secondary" onClick={handleClose}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
         <Grid container justify={"center"} direction="row">
            <Grid item xs={7}>
                <div>
                    <aside style={thumbsContainer}>{thumbs}</aside>
                </div>
            </Grid>
            <Grid item xs={1}>
                <Divider orientation="vertical" flexItem />
            </Grid>
            <Grid item xs={4}>
            <div>
                    <aside style={thumbsContainer}>{thumbsPhotosSelected}</aside>
                </div>
            </Grid>
         </Grid>
        
      </Dialog>
    </div>
  );
}