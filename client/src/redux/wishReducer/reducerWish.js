import {POST_WISH, GET_WISHES, DELETE_WISH, CLEAR_WISH} from './actionsWish'

const initialState = {
    wishes: [],
    counter: 0
}


const reducerWishList = (state = initialState, action) => {
    switch (action.type) {
      case CLEAR_WISH: {
        return {
          ...state,
          wishes:[],
          counter:0
        }
      }
      case POST_WISH: {
        if (!action.payload.data.message) {
          return {
            ...state,
            wishes: state.wishes.concat(action.payload.data),
            counter: state.counter + 1,
          };
        } else {
          return {
            ...state,
            wishes: state.wishes,
            counter: state.counter,
          };
        }
      }
      case GET_WISHES: {
        return {
          ...state,
          wishes: action.payload[0].products,
          counter: action.payload[0].products.length,
        };
      }
      case DELETE_WISH: {
        let newWishList = state.wishes.filter(
          (wish) => wish.id !== action.payload.id
        );
        if (state.counter >= 1) {
          return {
            ...state,
            wishes: newWishList,
            counter: state.counter - 1,
          };
        } else {
          return {
            ...state,
            wishes: newWishList,
            counter: state.counter,
          };
        }
      }
      default:
        return state;
    }
}
export default reducerWishList