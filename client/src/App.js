import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/routes';
import { useDispatch } from 'react-redux';
import jwt from "jsonwebtoken";
import { setUser } from './redux/loginReducer/actionLogin.js'
import axios from 'axios'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import {getAllPalettes} from './redux/paletteReducer/actionPalette'
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {

  const dispatch = useDispatch();
  const palette = useSelector(state => state.paletteReducer.palette)

  var theme = createMuiTheme({
    palette: {
      type: palette.type,
      primary: {
        main: palette.primaryMain,
        darker: palette.primaryDarker,
      },
      secondary: {
        main: palette.secondaryMain,
        darker: palette.secondaryDarker,
      },
      background:{
        default: palette.background
      }
    },
  });

   useEffect(() => {
    dispatch(getAllPalettes())
    let token = localStorage.getItem('token');
    if (token) {
      const user = jwt.decode(token);
      if (user.email) {
        dispatch(setUser(user));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    }
  }, [dispatch])

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;