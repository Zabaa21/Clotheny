import React, { useEffect } from "react";
import Carrousel from '../carousel/Carousel.jsx';
import Navbar from '../navbar/Navbar';
import Featured from './Featured'
import Swal from 'sweetalert2'
import axios from 'axios';
import { useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { initializateApp } from '../../services/initializateApp'
import { SET_STATE } from '../../redux/cartReducer/action'
import {setUser} from '../../redux/loginReducer/actionLogin.js'
import jwt from "jsonwebtoken";

function Home() {
  const userId = localStorage.getItem('userId')
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const url = window.location.href
    if(url.includes('&status=approved')){
      axios.put(`/orders/${userId}`, {state: 'completed' })
      .then(() => {Swal.fire('Congratz', `Your order was successfully completed`, 'success')})
      .then(() => axios.post(`/orders/email/checkout/${userId}`) )
      .then(() => initializateApp(userId, dispatch))
      .then(() => dispatch({type: SET_STATE, payload: 'cart'}))
      .then(() => history.push('/'))
    }
    if(url.includes('loginGoogle=true')){
      let token = url.slice(1).split("&")[1].slice(2).split("#")[0];
      let user = jwt.decode(token)
      localStorage.setItem("token", token);
      dispatch(setUser(user))
      history.replace('/')
    }
    if(url.includes('loginFacebook=true')){
      let token = url.slice(1).split("&")[1].slice(2).split("#")[0];
      let user = jwt.decode(token)
      localStorage.setItem("token", token);
      dispatch(setUser(user))
      history.replace('/')
    }
    // eslint-disable-next-line
  }, [])

  return (
    <React.Fragment>
      <Navbar/>
      <Carrousel></Carrousel>
      <Featured />
    </React.Fragment>
  );
}
export default Home