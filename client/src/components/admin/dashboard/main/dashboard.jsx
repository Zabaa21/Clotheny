import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ViewListIcon from '@material-ui/icons/ViewList';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link as RouterLink, Route, Switch } from "react-router-dom";
import ListCategory from '../categories/ListCategories.jsx';
import ListOrders from '../orders/ListOrders.jsx';
import OrderDetail from '../orders/OrderDetail.jsx';
import AddProductDashboard from '../products/addproducts/AddProductDashboard.jsx';
import UpdateProduct from '../products/updateproduct/updateProduct.jsx';
import ListProducts from '../tableList/listProduct.jsx';
import UpdatePhotos from '../uploadImg/UpdatePhotos.jsx';
import ListUsers from '../users/listUsers.jsx'
import EditUser from '../editUser/EditUser.jsx'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import PalleteDashboard from '../pallete/PalleteDashboard'
import ColorLensIcon from '@material-ui/icons/ColorLens';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function Dashboard() {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
                <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                Admin Panel
            </Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            variant="permanent"
            classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
        >
            <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
            </IconButton>
            </div>
            <Divider />
            <List>  
                <div>
                    <ListItem button component={RouterLink} to="/">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                            <ListItemText primary="Home" />
                    </ListItem>
                    <Divider />
                    <ListItem button component={RouterLink} to="/dashboard/orders">
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary="Orders" />
                    </ListItem>
                    <ListItem button component={RouterLink} to="/dashboard/listProducts">
                        <ListItemIcon>
                            <ViewListIcon />
                        </ListItemIcon>
                        <ListItemText primary="All Products" />
                    </ListItem>
                    <ListItem button component={RouterLink} to="/dashboard/addProduct">
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add Product" />
                    </ListItem>
                    <ListItem button component={RouterLink} to="/dashboard/addPhotos">
                        <ListItemIcon>
                            <AddAPhotoIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add Photos" />
                    </ListItem>
                    <ListItem button component={RouterLink} to="/dashboard/category">
                        <ListItemIcon>
                            <PlaylistAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Add Categorys" />
                    </ListItem>
                    <ListItem button component={RouterLink} to="/dashboard/listUsers">
                        <ListItemIcon>
                            <PeopleAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="List Users" />
                    </ListItem>
                    <ListItem button component={RouterLink} to="/dashboard/pallete">
                        <ListItemIcon>
                            <ColorLensIcon />
                        </ListItemIcon>
                        <ListItemText primary="Color Picker" />
                    </ListItem>
                </div>
            </List>
            <Divider />
        </Drawer>
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                <Paper className={classes.paper} id="bill" >
                  <Switch>
                      <Route path="/dashboard/addProduct" component={AddProductDashboard} />
                      <Route path="/dashboard/listProducts" component={ListProducts} />
                      <Route path="/dashboard/products/:productName/edit" component={UpdateProduct} /> 
                      <Route path="/dashboard/addPhotos" component={UpdatePhotos} /> 
                      <Route path="/dashboard/category" component={ListCategory} />
                      <Route exact path="/dashboard/orders" component={ListOrders} />
                      <Route exact path="/dashboard/user/:userId/orders/:orderId/view" component={OrderDetail} />
                      <Route exact path="/dashboard/listUsers" component={ListUsers} /> 
                      <Route exact path="/dashboard/pallete" component={PalleteDashboard} /> 
                      <Route exact path="/dashboard/user/:userId/edit" component={EditUser} /> 
                    {/* <Route component={NotFound} /> */}
                  </Switch>
                </Paper>
                </Grid>
            </Grid>
            </Container>
        </main>
        </div>
    );
}