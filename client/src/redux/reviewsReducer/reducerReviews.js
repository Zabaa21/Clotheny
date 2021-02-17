import {
POST_REVIEW, EDIT_REVIEW, GET_REVIEWS, DELETE_REVIEW,} from './actionsReviews.js'

const initialState = {
    reviews: []
}

const reducerReviews = (state = initialState, action) => {
  if (action.type === POST_REVIEW) {
    return {
      ...state,
      reviews: state.reviews.concat(action.payload)
    }
  }
  if (action.type === EDIT_REVIEW) {

    let editId =  action.payload.id
    for (let item of state.reviews){
      if (item.id === editId){
        item.description = action.payload.description
        item.rating = action.payload.rating
      }
    }
    return {
      ...state,
      reviews: state.reviews
    }
  }
  if (action.type === GET_REVIEWS){
    return {
      ...state,
      reviews: action.payload.data
    }
  }
  if (action.type === DELETE_REVIEW){
    return {
      ...state,
      reviews: state.reviews.filter((i) => action.payload.id !== i.id )
    }
  }
  return state;
};

export default reducerReviews;