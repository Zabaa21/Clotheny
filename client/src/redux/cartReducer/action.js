import axios from "axios";
import Swal from 'sweetalert2'

export const ADD_PRODUCT_CART = 'ADD_PRODUCT_CART';
export const REMOVE_PRODUCT_CART = 'REMOVE_PRODUCT_CART';
export const UPDATE_PRODUCT_CART = 'UPDATE_PRODUCT_CART';
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
export const INCREMENT_QUANTITY = 'INCREMENT_QUANTITY';
export const DECREMENT_QUANTITY = 'DECREMENT_QUANTITY';
export const SET_INITIAL_CART = 'SET_INITIAL_CART';
export const SET_INITIAL_ITEMS = 'SET_INITIAL_ITEMS';
export const CLEAN_CART = 'CLEAN_CART';
export const TOTAL_PRICE = 'TOTAL_PRICE';
export const SET_STATE = 'SET_STATE';




export function addItem(newProduct) {
  const isLogged = localStorage.getItem('token') ? true : false;
  const userId = localStorage.getItem('userId');
  newProduct.localCounter = 1;
  return function (dispatch) {
    if (isLogged) {
      axios.post(`/orders/users/${userId}/cart`, {id: newProduct.id}).then((res) =>
        dispatch({
          type: ADD_PRODUCT_CART,
          payload: newProduct,
        })
      );
    }
    else{
      let cart  = JSON.parse(localStorage.getItem("cart"))
      if(cart){
        if(!cart.find(item => item.id === newProduct.id)){
          let newCart = JSON.stringify(cart.concat(newProduct))
          localStorage.setItem('cart', newCart);
          dispatch({
            type: INCREMENT_COUNTER,
          })
        }
      }
      else{
        let newCart = JSON.stringify([newProduct])
        localStorage.setItem('cart', newCart);
        dispatch({
          type: INCREMENT_COUNTER,
        })
      }
    }
    
  };
}

export function removeItem(deleteProduct){
  const isLogged = localStorage.getItem('token') ? true : false;
  const userId = localStorage.getItem('userId');
  return function(dispatch){
    if(isLogged){
      axios
        .delete(`/orders/users/${userId}/cart/${deleteProduct.id}`)
        .then((res) =>
          dispatch({
            type: REMOVE_PRODUCT_CART,
            payload: deleteProduct,
          })
        );
    }
    else{
      let cart = JSON.parse(localStorage.getItem("cart"))
      cart = JSON.stringify(cart.filter((e) => e.id !== deleteProduct.id));
      localStorage.setItem('cart', cart);
    }
    dispatch({
      type: DECREMENT_COUNTER,
    })
  }
}

export const increaseProduct = (item) => (dispatch) => {
  const isLogged = localStorage.getItem('token') ? true : false;
   if (isLogged) {
      dispatch({ type: INCREMENT_QUANTITY, payload: item.id }) 
   } else {
     let currentCart = JSON.parse(localStorage.getItem('cart'));
     let index = null;
     let newProd = {}
     for(let [i, prod] of currentCart.entries()){
       if(prod.id === item.id){
        index = i
        newProd = prod
       }
     }
     newProd.localCounter ? newProd.localCounter++ : newProd.localCounter = 1;
     currentCart[index] = newProd
     localStorage.setItem('cart', JSON.stringify(currentCart));
   }
}

export const decreaseProduct = (item) => (dispatch) => {
  const isLogged = localStorage.getItem('token') ? true : false;
  if (isLogged) {
    dispatch({ type: DECREMENT_QUANTITY, payload: item.id }) 
  } else {
     let currentCart = JSON.parse(localStorage.getItem('cart'));
     let index = null;
     let newProd = {}
     for(let [i, prod] of currentCart.entries()){
       if(prod.id === item.id){
        index = i
        newProd = prod
       }
     }
     newProd.localCounter && newProd.localCounter > 1 && newProd.localCounter--;
     currentCart[index] = newProd
     localStorage.setItem('cart', JSON.stringify(currentCart));
    }
}

export const cleanCart = () => (dispatch) => {
  dispatch({type: CLEAN_CART})
}

export const totalPrice = () => (dispatch) => {
  dispatch({type: TOTAL_PRICE})
}

export const goBackCart = (products) => (dispatch) => {
  const userId = localStorage.getItem('userId') 
  const backCart = []
  const promises = products && products.map(item => {
    return new Promise((resolve, reject) => {
      resolve(axios.put(`/orders/users/${userId}/cart`, { id: item.id, quantity: 1 }))
    })
  })
  const productPromises = products && products.map(item => {
    return new Promise((resolve, reject) => {
      resolve(
        axios.get(`/products/${item.id}`)
        .then(res => {
          let newProd = res.data
          newProd.localCounter = 1
          backCart.push(newProd)})
        )
    })
  })
  Promise.all(productPromises)
  .then(() => {dispatch({type: SET_INITIAL_CART, payload: backCart}); dispatch({type: SET_INITIAL_ITEMS, payload: backCart.length})})
  Promise.all(promises)
  .then(res => {
    axios.put(`/orders/${userId}`, { state: 'cart', purchaseAmount: null})
    dispatch({type: SET_STATE, payload: 'cart'})
  })
} 

export const setCartState = (cart, state, price) => (dispatch) => {
  const userId = localStorage.getItem('userId')
  const available = []
  cart.forEach(item => {
    if(item.localCounter> item.stock){
      let string = `The product <font color='red'>${item.name}</font> has only ${item.stock} unit(s)`
      available.push(string)
    }
  })
  if(!available.length){
      const allProductsCart = cart && cart.map(item => {
        return new Promise((resolve, reject) => {
          resolve(axios.put(`/orders/users/${userId}/cart`, 
            { id: item.id, quantity: item.localCounter })
          )
        })
      })
      Promise.all(allProductsCart)
        .then(() => {
          axios.put(`/orders/${userId}`, {state, purchaseAmount: price})
          dispatch({type: SET_STATE, payload: state, price})
      })
  }
    else{
        let res = ''
        available.forEach(item => {
          res += item + '<br>'
        })
        Swal.fire('Oops...', `
        <strong> Some products hasn't enough stock.</strong> <br>
        ${res}         
         `, 'error')
    }
}