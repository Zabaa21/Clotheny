import { Divider, Grid, IconButton, InputBase, InputLabel, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, Select, Typography } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import DirectionsIcon from '@material-ui/icons/Directions';
import DoneIcon from '@material-ui/icons/Done';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { SketchPicker } from 'react-color';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { addPalette, filterPalette, getAllPalettes, removePalette, updatePalette } from '../../../../redux/paletteReducer/actionPalette';


const useStyles = makeStyles((theme) => ({
    card: {
     minWidth: "50%",
     maxWidth: "90%",
     margin: "auto",
     marginTop: "1rem",
     padding: "1%"
    },
    margin: {
     margin: theme.spacing(1),
    },
    title: {
    flex: '1 1 100%',
    },
    colorNames: {
    flex: '1 1 100%',
    fontWeight: "bolder"
    },
    inputs: {
        height: "50",
    },
    doneButton:{
        backgroundColor: theme.palette.success.main
    },
    cancelButton:{
        backgroundColor: theme.palette.error.main
    },
    button:{
        
        borderColor: theme.palette.primary.darker
    },
    list: {
        width: '100%',
        maxWidth: 360,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        backgroundColor: theme.palette.background.paper,
      },
    itemList:{
        '&:Focus': {
            backgroundColor: fade(theme.palette.grey[700], 0.45), 
        },
    },
    searchbar: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "100%",
      },
      textInput: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
      iconButton: {
        color: theme.palette.warning.main,
        padding: 10,
      },
      divider: {
        height: 28,
        margin: 4,
      },
      colorBox:{
            borderRadius: "30%",
            height:"25px",
            width:"25px",
      },
      bgGrey: {
          color: "red",         
        }
 }));

const PalleteDashboard = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [paletteName, setPaletteName] = useState("") 
    const [palette, setPalette] = useState({})
    const [isEditing, setIsEditing] = useState(true)
    const [editor, setEditor] = useState(false)
    const [colorPicker, setColorPicker] = useState(false)
    const [color, setColor] = useState("")
    const [colorKey, setColorKey] = useState("")
    const filterPalettes = useSelector(state => state.paletteReducer.filterPalettes)
    const allPalettes = useSelector(state => state.paletteReducer.allPalettes)
    const currentPalette = useSelector(state => state.paletteReducer.palette)

    useEffect(() => {
        dispatch(getAllPalettes())
    },[dispatch])

    const handlePaletteClick = (palette) => {
        if(!editor){
            if(palette.name !== currentPalette.name){
                setEditor(true)
                setPalette(palette)
            } else {
                Swal.fire('Oops...', `You can't edit the current palette<br>`, 'error')
            }
        } else {
            Swal.fire('Oops...', `You have to confirm or discard -changes before you select another palette<br>`, 'error') 
        }
    }

    const handleColorPicker = (color, key) => {
        setColor(color)
        setColorKey(key)
        setColorPicker(true)
    }

    const savePalette = () => {
        if(isEditing){
            dispatch(updatePalette(palette))
            setEditor(false)
        }
        else{
            dispatch(addPalette(palette))
            setEditor(false)
            setIsEditing(true)
            setPaletteName("")
        }
    }

    const handleCancel = () => {
        setEditor(false)
        dispatch(getAllPalettes())
        setPaletteName("")
    }

    const paletteDetails = () => (
        <Paper component="div" style={{padding:"5%", paddingRight:"15%"}}>
            <Grid container direction="row" spacing={2}>
                <Grid item container xs={12}>
                    <Grid item container direction="column" justify="center" spacing={4}>
                        <Grid item container direction="row" justify="center" spacing={4}>
                            <Grid item>
                                <InputLabel htmlFor="outlined-type-native-simple">Type</InputLabel>
                                    <Select
                                        native
                                        value={palette.type}
                                        onChange={(e) => setPalette({...palette, type: e.target.value })}
                                        label="type"
                                        labelWidth={60}
                                        inputProps={{
                                            name: 'type',
                                            id: 'outlined-type-native-simple',
                                        }}
                                        >
                                    <option value={"light"}>Light</option>
                                    <option value={"dark"}>Dark</option>
                                </Select>
                            </Grid>
                            <Grid item>
                                <InputLabel htmlFor="outlined-status-native-simple">Status</InputLabel>
                                    <Select
                                        native
                                        value={palette.status}
                                        onChange={(e) => setPalette({...palette, status: e.target.value })}
                                        label="status"
                                        labelWidth={60}
                                        inputProps={{
                                            name: 'status',
                                            id: 'outlined-status-native-simple',
                                        }}
                                        >
                                    <option value={"active"}>Active</option>
                                    <option value={"disabled"}>Disabled</option>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" justify="space-between">
                            <Grid item>
                                <Typography className={classes.colorNames} variant="subtitle2" id="tableTitle" component="div">
                                    Primary Main: 
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Paper 
                                    elevation={6} 
                                    component="div" 
                                    className={classes.colorBox} 
                                    onClick={() => handleColorPicker(palette.primaryMain, "primaryMain")} 
                                    style={{ backgroundColor: palette.primaryMain}} />
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" justify="space-between">
                            <Grid item>
                                <Typography className={classes.colorNames} variant="subtitle2" id="tableTitle" component="div">
                                    Primary Darker: 
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Paper 
                                    elevation={6} 
                                    component="div" 
                                    className={classes.colorBox} 
                                    onClick={() => handleColorPicker(palette.primaryDarker, "primaryDarker")} 
                                    style={{ backgroundColor: palette.primaryDarker}} />
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" justify="space-between">
                            <Grid item>
                                <Typography className={classes.colorNames} variant="subtitle2" id="tableTitle" component="div">
                                    Secondary Main: 
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Paper 
                                    elevation={6} 
                                    component="div" 
                                    className={classes.colorBox} 
                                    onClick={() => handleColorPicker(palette.secondaryMain, "secondaryMain")} 
                                    style={{ backgroundColor: palette.secondaryMain}} />
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" justify="space-between">
                            <Grid item>
                                <Typography className={classes.colorNames} variant="subtitle2" id="tableTitle" component="div">
                                    Secondary Darker: 
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Paper 
                                    elevation={6} 
                                    component="div" 
                                    className={classes.colorBox}
                                    onClick={() => handleColorPicker(palette.secondaryDarker, "secondaryDarker")} 
                                    style={{ backgroundColor: palette.secondaryDarker}} />
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" justify="space-between">
                            <Grid item>
                                <Typography className={classes.colorNames} variant="subtitle2" id="tableTitle" component="div">
                                    Background: 
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Paper 
                                    elevation={6} 
                                    component="div" 
                                    onClick={() => handleColorPicker(palette.background, "background")}
                                    className={classes.colorBox} 
                                    style={{ backgroundColor: palette.background}} 
                                />
                            </Grid>
                        </Grid>
                        <Grid item container justify="flex-end" spacing={2} direction="row">
                            <Grid item>
                                <IconButton className={classes.cancelButton} size="small" onClick={handleCancel} aria-label="upload picture" component="span">
                                    <ClearIcon />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton className={classes.doneButton} size="small" onClick={savePalette} aria-label="upload picture" component="span">
                                    <DoneIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    ) 

    const handleColorChange = (color, key) => {
        setPalette({
            ...palette, 
            [key]: color
        })
        setColorPicker(false)
    }

    const handleCreatePalette = () => {
        if(allPalettes.find(({name}) => name === paletteName)){
            Swal.fire('Oops...', `That name is already used<br>`, 'error') 
        }
        else if(paletteName.length > 3){
            createPalette()
        }
        else{
            Swal.fire('Oops...', `The name of the Palette must have more than 3 characters`, 'error') 
        }
    }

    const createPalette = () => {
        setIsEditing(false)
        setPalette({
            status: "active",
            name: paletteName,
            type: 'light',
            primaryMain: '#FFF',
            primaryDarker: '#FFF',
            secondaryMain: '#FFF',
            secondaryDarker: '#FFF',
            background: '#FFF',
        })
        setEditor(true)
    }

    return (
        <>
            <Paper className={classes.card} elevation={5} style={{ padding:"2%"}}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                            Color Picker
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.title} variant="subtitle2" id="tableTitle" component="div">
                            You can change the theme colors from here. Take care, all changes will be applied to all the online users
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} justify="center" direction="row">
                    <Grid item container xs={12} sm={12} md={4} direction="column" spacing={1}>
                        <Grid item container direction="row" xs={12} spacing={2}> 
                            <Paper>
                                <div className={classes.searchbar}>
                                    <InputBase
                                        className={classes.input}
                                        value={paletteName}
                                        onChange={(e) => {dispatch(filterPalette(e.target.value)); setPaletteName(e.target.value)}}
                                        placeholder="Find or Create palette"
                                    />
                                    <Divider className={classes.divider} orientation="vertical" />
                                    <IconButton className={classes.iconButton} aria-label="directions" onClick={handleCreatePalette}>
                                        <DirectionsIcon />
                                    </IconButton>
                                </div>
                                <List className={classes.list}>
                                    {filterPalettes.map((item) => (
                                        <ListItem button key={item.id} >
                                            <ListItemText 
                                                primary={item.name} 
                                                className={clsx(editor && item.name === palette.name && classes.bgGrey)} 
                                                onClick={() => handlePaletteClick(item)}
                                            />
                                            <ListItemSecondaryAction>
                                                {item.name !== "default" ? <IconButton 
                                                edge="end" 
                                                aria-label="delete" 
                                                onClick={() => dispatch(removePalette(item))}>
                                                    <DeleteIcon />
                                                </IconButton>: null}
                                            </ListItemSecondaryAction>
                                        </ListItem>))}
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} sm={12} md={4} direction="column" spacing={1}>
                        {editor ? paletteDetails() : null}
                    </Grid>
                    <Grid item container xs={12} sm={12} md={4} spacing={1}>
                        {colorPicker ? 
                        (<Grid item container xs={12} direction="row" justify="center" alignItems="flex-start" >
                            <Grid item container xs={12} direction="row">
                                <Grid item xs={12}>
                                    <SketchPicker
                                        color={color}
                                        onChange={(e) => setColor(e.hex)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item container xs={12} direction="row" justify="flex-end" style={{paddingRight: "10%", marginTop:"-15%"}}>
                                <Grid item>
                                        <IconButton className={classes.doneButton} size="small" onClick={() => handleColorChange(color, colorKey)} aria-label="upload picture" component="span">
                                            <DoneIcon />
                                        </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                        )
                        : 
                        null}
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default PalleteDashboard
