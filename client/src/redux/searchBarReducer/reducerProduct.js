import {SEARCH_PRODUCTS} from './actionsProducts'

const initialState = {
  product: []
}

export default (state = initialState, action) => {
  if (action.type === SEARCH_PRODUCTS) {
        return {
            ...state,
            product: action.payload
        };
    }
    return state;
}