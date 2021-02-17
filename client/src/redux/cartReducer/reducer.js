import {
  ADD_PRODUCT_CART,
  REMOVE_PRODUCT_CART,
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  SET_INITIAL_CART,
  SET_INITIAL_ITEMS,
  CLEAN_CART,
  TOTAL_PRICE,
  SET_STATE
} from './action.js';

const initialState = {
    cart: [],
    counter: JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")).length : 0,
    totalPrice: 0,
    cartState: "cart"
  }
  
  export default (state = initialState, action) => {
    if(action.type === SET_INITIAL_CART){
      return {...state, cart: action.payload, counter: action.payload.length}
    }

    if (action.type === ADD_PRODUCT_CART) {
      if(!state.cart.find(item => item.id === action.payload.id)){
        let newProd = action.payload
        newProd.localCounter = 1
        let newCart = state.cart.concat(newProd)
          return {
              ...state,
              cart: newCart,
              counter: newCart.length
          };
        }
      }
    
    if(action.type === REMOVE_PRODUCT_CART){
      let newCart = state.cart.filter(product => product.id !== action.payload.id)
      return {
          ...state,
          cart: newCart,
          counter: newCart.length
      }
    }
    
    if (action.type === INCREMENT_QUANTITY){
      let newCart = state.cart
      let index = null;
      let newProd = {}
      for(let [i, prod] of state.cart.entries()){
        if(prod.id === action.payload){
          index = i
          newProd = prod
        }
      }
      newProd.localCounter++;
      newCart[index] = newProd
      return {
        ...state,
        cart: newCart
      }
    }
    
    if(action.type === DECREMENT_QUANTITY){

      let newCart = state.cart
      let index = null;
      let newProd = {}
      for(let [i, prod] of state.cart.entries()){
        if(prod.id === action.payload){
          index = i
          newProd = prod
        }
      }
      if(newProd.localCounter > 1){
        newProd.localCounter--;
        newCart[index] = newProd
      }
      return {
        ...state,
        cart: newCart
      }
    }

    if(action.type === SET_INITIAL_ITEMS){
      return {...state, counter: action.payload}
    }
    
    if (action.type === INCREMENT_COUNTER) {
      return {
          ...state,
          counter: (state.counter += 1),
        };
      }

    if(action.type === INCREMENT_COUNTER){
      return {
        ...state,
        counter: state.counter += 1
      }
    }

    if(action.type === DECREMENT_COUNTER){
      return {
        ...state,
        counter: state.counter -= 1
      }
    }
    if(action.type === CLEAN_CART){
      return {
        ...state,
        cart: [],
        counter: 0
      }
    }
    if(action.type === TOTAL_PRICE) {
      let price = 0
      state.cart.forEach((item) => {
        price += (item.price * item.localCounter)
      })
      return{
        ...state,
        totalPrice: price
      }
    }
    if(action.type === SET_STATE){
      return {
          ...state,
          cartState: action.payload,
      }
    }
    return state;
  }