  
import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid } from "@material-ui/core";
import {useDropzone} from 'react-dropzone';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'
import axios from 'axios'
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    card: {
     margin: "auto",
     marginTop: "0.2rem",
     padding: "1%",
     minHeight: "600px"
   },
   margin: {
     margin: theme.spacing(1),
   },
   inputs: {
       height: "50",
   }
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
  const dropzone = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: 100,
    padding: "10px",
    borderWidth: "2px",
    borderRadius: "2px",
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
}

const UpdatePhotos = () => {

    const [files, setFiles] = useState([]);
    const [photos, setPhotos] = useState([])
    const classes = useStyles();


    const listPhotos = () => {
      axios.get('http://localhost:3001/dashboard/listPhotos').then(res => setPhotos(res.data))
    }
    useEffect(listPhotos,[])

    const Upload = (files) => {
        //const url = `https://api.cloudinary.com/v1_1/${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
        const uploadURL = 'https://api.cloudinary.com/v1_1/henry-e/image/upload';
        const uploadPreset = 'rkbb4en8';
        const apikey = "555657752225283"
        // https://res.cloudinary.com/henry-e/image/upload/v1611238394/%LINK%.jpg
     
        files.forEach(file => {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', uploadPreset);
          formData.append("api_key", apikey);
/*           axios.post(uploadURL, formData)
          .then(res => {
            return axios.post('http://localhost:3001/dashboard/addPhotos', {url: res.data.url} )
            }) */
            fetch(uploadURL,{
              method: "POST",
              body: formData,
            }).then(r => r.json())
            .then(response => axios.post('http://localhost:3001/dashboard/addPhotos', {url: response.url}))
            .then(res => {
              listPhotos() 
              setFiles([])
            })
          .catch(err => console.log(err))
        }) 
    }
    //«images_pkey»
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: 'image/*',
        multiple:  true,
        onDrop: acceptedFiles => {
            setFiles(files.concat(acceptedFiles.map(file => Object.assign(file, {
              preview: URL.createObjectURL(file)})
              )))
        }
      })

    const handleDelete = (name) => {
        setFiles(files.filter(file => file.name !== name))
    } 

    const handleDeletePhotos = (id) => {
      axios.delete(`http://localhost:3001/dashboard/deletePhoto/${id}`).then(setPhotos(photos.filter(element => id !== element.id)))
  } 

    const thumbs = files.map((file,i) => (
        <div key={i}>
            <div style={thumb} >
                <div style={thumbInner}> 
                    <img key={file.name} src={file.preview} style={img}alt={""}/>
                </div>
            </div>
            <IconButton key={i} onClick={() => handleDelete(file.name)} aria-label="delete" >
                <DeleteIcon />
            </IconButton> 
        </div>
      ));
    const photosMap = photos && photos.map((file,i) => (
        <div key={i}>
            <div style={thumb} >
                <div style={thumbInner}> 
                    <img key={file.id} src={file.url} style={img}alt={""}/>
                </div>
            </div>
            <IconButton key={i} onClick={() => handleDeletePhotos(file.id)} aria-label="delete" >
                <DeleteIcon />
            </IconButton> 
        </div>
      ));


    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <Grid container spacing={3} justify="center">
            <Grid item xs={12}>
              <section className="container">
                <Grid
                  container
                  alignItems="center"
                  justify={'center'}
                  direction="row"
                  spacing={5}
                >
                  <Grid item>
                    <div style={dropzone} {...getRootProps()}>
                      <input {...getInputProps()} />
                      {isDragActive ? (
                        <p>Drag your image here</p>
                      ) : (
                        <p>Drag the image here or click to upload</p>
                      )}
                    </div>
                  </Grid>
                </Grid>
              </section>
            </Grid>
            <Grid item xs={12}>
              <div>
                <aside style={thumbsContainer}>{thumbs}</aside>
              </div>
            </Grid>
            <Grid item xs={12}>
              <hr></hr>
            </Grid>
            <Grid item xs={12}>
              <div>
                <aside style={thumbsContainer}>{photosMap}</aside>
              </div>
            </Grid>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => Upload(files)}
            >
              Add To Gallery
            </Button>
          </Grid>
        </Card>
      </div>
    );
}
export default UpdatePhotos             

