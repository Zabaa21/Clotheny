import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import PaletteIcon from '@material-ui/icons/Palette';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import SearchBar from '../searchbar/SearchBar';
import { logOutUser } from '../../redux/loginReducer/actionLogin';
import { cleanCart } from '../../redux/cartReducer/action';
import AssessmentIcon from '@material-ui/icons/Assessment';
import InputIcon from '@material-ui/icons/Input';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import StorefrontIcon from '@material-ui/icons/Storefront';
import {changePalette} from '../../redux/paletteReducer/actionPalette'
import PeopleIcon from '@material-ui/icons/People';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {clearWish} from "../../redux/wishReducer/actionsWish";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar:{
    boxShadow: "none"
  },
  menuButton: {
    display: 'flex',
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    letterSpacing: '1px',
    fontFamily: 'Barlow',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  drops: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      marginLeft: theme.spacing(5),
      alignItems: 'baseline',
    },
  },
  toolbarLink: {
    padding: theme.spacing(1),
    '&:hover': {
      color: 'inherit',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  LinkHome: {
    '&:hover': {
      color: 'inherit',
    },
  },
  hoverMenu: {
    '&:hover': {
      opacity: 1,
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [palette, setPalette] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMenuPaletteOpen = Boolean(palette);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const cartQuantity = useSelector((state) => state.cartReducer.counter);
  const wishQuantity = useSelector((state) => state.wishListReducer.counter);
  const isLogged = useSelector((state) => state.loginReducer.isLogged);
  const allPalettes = useSelector((state) => state.paletteReducer.allPalettes);
  const user = useSelector((state) => state.loginReducer.user);
  const dispatch = useDispatch();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePaletteMenuOpen = (event) => {
    setPalette(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setPalette(null)
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogOut = () => {
    dispatch(logOutUser());
    dispatch(cleanCart());
    dispatch(clearWish());
    window.location = '/'
    handleMenuClose();
  };

  const handlePaletteChange = (palette) => {
    dispatch(changePalette(palette))
    setPalette(false)
  }

  const menuId = 'primary-search-account-menu';

  const renderPaletteMenu = () => (
        <Menu
          anchorEl={palette}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuPaletteOpen}
          onClose={handleMenuClose}
        >
          {allPalettes && allPalettes.map((palette) => (
            palette.status === "active" ? (
              <MenuItem key={palette.id} onClick={() => handlePaletteChange(palette)}>{palette.name}</MenuItem>
            ): null
          ))} 
        </Menu>
  );

  const renderMenu = () => {
    if (isLogged) {
      return (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem component={RouterLink}
            to={'/me'}>Profile</MenuItem>
          <MenuItem onClick={handleLogOut}>Log Out</MenuItem>

        </Menu>
      );
    } else {
      return (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          id={menuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={handleMenuClose}
            component={RouterLink}
            to={'/login'}
          >
            Log in
          </MenuItem>
          <MenuItem
            onClick={handleMenuClose}
            component={RouterLink}
            to={'/register'}
          >
            Sign Up
          </MenuItem>
        </Menu>
      );
    }
  };

  const logginRenderDesktop = () => {
    if (isLogged) {
      return (
        <IconButton
          variant="contained"
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      );
    } else {
      return (
        <IconButton
          variant="contained"
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <InputIcon />
        </IconButton>
      );
    }
  };
  const logginRenderMobile = () => {
    if (isLogged) {
      return (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      );
    } else {
      return (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Account</p>
        </MenuItem>
      );
    }
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {user.role ? (
       <MenuItem component={RouterLink} to={'/dashboard'}>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <AssessmentIcon />
          </IconButton>
          <p>Admin</p>
        </MenuItem>
      ) : null}
      {isLogged ? (<MenuItem component={RouterLink} to={'/wishlist'}>
        <IconButton variant="contained" color="inherit" >
            <Badge badgeContent={wishQuantity} color="secondary">
              <FavoriteIcon />
            </Badge>
            </IconButton>
            <p>WishList</p>
      </MenuItem>): null}
      
      <MenuItem component={RouterLink} to={'/cart'}>
        <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={cartQuantity} color="secondary">
            <LocalMallIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>

      <MenuItem onClick={handlePaletteMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <PaletteIcon />
          </IconButton>
          <p>Palette</p>
        </MenuItem>
      {renderPaletteMenu()}
      {logginRenderMobile()}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="sticky" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            href="/products"
            to="/products"
            color="inherit"
            aria-label="open drawer"
          >
            <StorefrontIcon />
          </IconButton>
          <IconButton
            edge="start"
            className={classes.menuButton}
            href="/about"
            to="/about"
            color="inherit"
            aria-label="open drawer"
          >
            <PeopleIcon />
          </IconButton>
          <Link
            className={classes.LinkHome}
            underline={'none'}
            color="inherit"
            component={RouterLink}
            to="/"
          >
            <Typography className={classes.title} variant="h5" noWrap>
              CLOTHENY
            </Typography>
          </Link>
          <div className={classes.drops}>
            <Link
              className={classes.LinkHome}
              color="inherit"
              component={RouterLink}
              to="/products"
            >
              <Typography className={classes.title} variant="h6" noWrap>
                Shop
              </Typography>
            </Link>
          </div>
          <div className={classes.drops}>
            <Link
              className={classes.LinkHome}
              color="inherit"
              href="/about"
              to="/about"
            >
              <Typography className={classes.title} variant="h6" noWrap>
                About Us
              </Typography>
            </Link>
          </div>
          <div className={classes.grow} />
          <div className={classes.search}>
            <SearchBar />
          </div>
          <div>{user.role ? <div></div> : null}</div>
          <div className={classes.sectionDesktop}>
            {user.role ? (
              <div>
                <IconButton
                  color="inherit"
                  component={RouterLink}
                  to={'/dashboard'}
                >
                  <AssessmentIcon />
                </IconButton>
              </div>
            ) : null}
            {isLogged ? (
              <IconButton
                  variant="contained"
                  color="inherit"
                  component={RouterLink}
                  to={'/wishlist'}
                >
                  <Badge badgeContent={wishQuantity} color="secondary">
                    <FavoriteIcon />
                  </Badge>
            </IconButton>): null
            }
            
            <IconButton
              aria-label="show 17 new notifications"
              color="inherit"
              component={RouterLink}
              to={'/cart'}
            >
              <Badge badgeContent={cartQuantity} color="secondary">
                <LocalMallIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handlePaletteMenuOpen}
              color="inherit"
            >
              <PaletteIcon />
            </IconButton>
            {logginRenderDesktop()}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderPaletteMenu()}
      {renderMenu()}
    </div>
  );
}