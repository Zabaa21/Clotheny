import axios from 'axios'
import {mergeOrderProducts} from '../../services/mergeOrdersProducts'

export const GET_PRODUCTS_BY_ORDER = 'GET_PRODUCTS_BY_ORDER';
export const SET_ORDER_DETAILS = 'SET_ORDER_DETAILS';


export const getOrderProducts = (userId, orderId) => async (dispatch) => {
    let cartProducts = []
    let orderLines = []
    await axios.get(`/orders/users/${userId}/order/${orderId}`)
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
            dispatch({type: GET_PRODUCTS_BY_ORDER, payload: mergeOrderProducts(orderLines,cartProducts)}) 
        })
    })
}

export const getOrderDetails = (orderId) => async (dispatch) => {
    await axios.get(`/orders/${orderId}`).then(res => dispatch({type: SET_ORDER_DETAILS, payload: res.data}))
}