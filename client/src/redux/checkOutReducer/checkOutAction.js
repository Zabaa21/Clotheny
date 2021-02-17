import axios from 'axios';
import { mergeOrderProducts } from '../../services/mergeOrdersProducts'

export const SET_FORM = 'SET_FORM';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const CLEAN_CHECKOUT = 'CLEAN_CHECKOUT'

export const setForm = (name, value) => {
    return {type: SET_FORM, payload: {name, value}}
}

export const setProducts = (userId) => async (dispatch) => {
    let cartProducts = []
    let orderLines = []
    await axios.get(`/orders/users/${userId}/cart`)
    .then(res => res.data)
    .then(res => {
        orderLines = res
        const allProducts = res.map(item => {
            return new Promise((resolve, reject) => {
              resolve(
                axios.get(`/products/${item.productId}`)
                .then(res => {
                  cartProducts.push(res.data)})
                )
            })
          })
        return allProducts
    })
    .then(res => {
        Promise.all(res)
        .then(res => {
            dispatch({type: SET_PRODUCTS, payload: mergeOrderProducts(orderLines,cartProducts)}) 
        })
    })
}

export const cleanCheckout = () => {
    return {type: CLEAN_CHECKOUT}
}