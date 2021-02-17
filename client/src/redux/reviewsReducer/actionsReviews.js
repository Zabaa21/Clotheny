import axios from "axios";
export const POST_REVIEW = 'POST_REVIEW'
export const EDIT_REVIEW = 'EDIT_REVIEW'
export const GET_REVIEWS = 'GET_REVIEWS'
export const DELETE_REVIEW = 'DELETE_REVIEW'

export const postReview = (data) => (
  dispatch
) => {
    axios
      .post(`/reviews/${data.productId}/${data.userId}/`, {
        rating: data.rating,
        description: data.description,
      })
      .then((review) => {
        dispatch({
          type: POST_REVIEW,
          payload: review.data,
        });
      })
      .catch((err) => console.log(err));
};

export const editReview = (productId, idReview, rating, description) => (
  dispatch
) => {
    axios
      .put(`/reviews/${productId}/${idReview}/`, {
        rating,
        description,
      })
      .then((review) => {
        dispatch({
          type: EDIT_REVIEW,
          payload: review,
        })
      })
      .catch((err) => console.log(err))
}

export const getReviews = (productId) => (dispatch) => {
    if(productId){
      axios
        .get(`/reviews/${productId}`)
        .then((review) => {
          dispatch({
            type: GET_REVIEWS,
            payload: review,
          });
        })
        .catch((err) => console.log(err));
    }
}

export const deleteReview = (productId, idReview) => (dispatch) => {
    axios
      .delete(`/reviews/${productId}/${idReview}`)
      .then ((deletedReview) => {
        dispatch({
          type: DELETE_REVIEW,
          payload: deletedReview
        })
      })
      .catch((err) => console.log(err));
}