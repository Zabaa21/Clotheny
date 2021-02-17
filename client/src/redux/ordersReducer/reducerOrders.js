import {GET_PRODUCTS_BY_ORDER,SET_ORDER_DETAILS} from './actionOrders'



const initialState = {
    orders: [],
    orderDetail: []
    }

    export default (state = initialState, action) => {
        switch (action.type){
            case GET_PRODUCTS_BY_ORDER:{
                return {...state, orders: action.payload}
            }
            case SET_ORDER_DETAILS:{
                return {...state, orderDetail: action.payload}
            }
            default: return state;
        }
    }