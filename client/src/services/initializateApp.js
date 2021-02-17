import axios from 'axios';
import { SET_INITIAL_ITEMS, SET_INITIAL_CART, SET_STATE } from '../redux/cartReducer/action';
import {getPalette } from '../redux/paletteReducer/actionPalette';
import { setProducts } from '../redux/checkOutReducer/checkOutAction';
import { GET_WISHES } from '../redux/wishReducer/actionsWish'

export const initializateApp = async (userId, dispatch) => {
    if(userId){
      dispatch(getPalette(userId))
      axios.get(`/wishlist/${userId}`)
      .then(res => {
        if(res.data && !res.data.length){
          axios.post(`/wishlist/${userId}`)
        }
        return res
      })
      .then(res => {
          res.data && res.data.length && dispatch({
              type: GET_WISHES,
              payload: res.data,
          })
      })
      .then(async ()  => {
        let currentCart = {}
        await axios.get(`/orders/active/${userId}`)
        .then(res => {
          res.data.length && dispatch({type: SET_STATE, payload: res.data[0].state})
          return res
        })
        .then(res => {
          currentCart = res.data.length && res.data[0]
        })
        .then(() => {
          if(!currentCart.state) {
            axios.post(`/orders/${userId}`, {state: 'cart'})
            .then(() => {
              let cart = JSON.parse(localStorage.getItem('cart'));
              localStorage.removeItem('cart')
              
              const promisesOne = cart && cart.map(item => {
                return new Promise((resolve, reject) => {
                  resolve(axios.post(`/orders/users/${userId}/cart`, { id: item.id }))
                })
              })
              Promise.all(promisesOne || [])
              .then(
                () => {
                axios.get(`/orders/users/${userId}/cart`)
                .then(res => {
                  dispatch({type: SET_INITIAL_ITEMS, payload: res.data.length})
                  return res.data
                })
                .then(res => {
                  let reduxCart = []
                  const promises = res.map(item => {
                    return new Promise((resolve, reject) => {
                      resolve(
                        axios.get(`/products/${item.productId}`)
                        .then(res => {
                          let newProd = res.data
                          newProd.localCounter = 1
                          reduxCart.push(newProd)})
                        )
                    })
                  })
                  Promise.all(promises)
                    .then(() => dispatch({type: SET_INITIAL_CART, payload: reduxCart}))
                  })
                  
                })
                .catch(err => console.log(err))
            })
          }
  
          currentCart.state === 'created' && localStorage.removeItem('cart');

          if(currentCart.state === 'processing'){
            localStorage.removeItem('cart');
            dispatch(setProducts(userId))
            dispatch({type: 'SET_TOTAL_PRICE', payload: currentCart.purchaseAmount })
          }
  
          if(currentCart.state === 'cart') {
            let cart = JSON.parse(localStorage.getItem('cart'));
            localStorage.removeItem('cart');
            const promises = cart && cart.map(item => {
              return new Promise((resolve, reject) => {
              resolve(axios.post(`/orders/users/${userId}/cart`, { id: item.id }))
              })
            })
            Promise.all(promises || [])
            .then(
              () => {
              axios.get(`/orders/users/${userId}/cart`)
              .then(res => {
                dispatch({type: SET_INITIAL_ITEMS, payload: res.data.length})
                return res.data
              })
              .then(res => {
                let reduxCart = []
                const promises = res.map(item => {
                  return new Promise((resolve, reject) => {
                    resolve(
                      axios.get(`/products/${item.productId}`)
                      .then(res => {
                        let newProd = res.data
                        newProd.localCounter = 1
                        reduxCart.push(newProd)})
                      )
                  })
                })
                Promise.all(promises)
                  .then(() => dispatch({type: SET_INITIAL_CART, payload: reduxCart}))
                })                 
              })
          }
        })
      })
      }
    }