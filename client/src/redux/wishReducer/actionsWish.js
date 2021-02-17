import axios from "axios"
export const POST_WISH = 'POST_WISH'
export const GET_WISHES = 'GET_WISHES'
export const DELETE_WISH = 'DELETE_WISH'
export const CLEAR_WISH = 'CLEAR_WISH'


export const clearWish = () => (dispatch) => {
    dispatch({
        type: CLEAR_WISH
    })
}


export const postWish = (data) => 
(dispatch) => {
    axios
        .post(`/wishlist/${data.userId}/wish`, {
            id: data.productId,
        }).then((wish) => {
            dispatch({
                type: POST_WISH,
                payload: wish
            })
        }).catch((err)=> console.log(err))
}

export const getWishes = (userId) => (dispatch) => {
    if(userId){
        axios
        .get(`/wishlist/${userId}`)
        .then((res)=>{
            dispatch({
                type: GET_WISHES,
                payload: res.data,
            })
        }).catch((err) => console.log(err))
    }
}

export const deleteWish = (wishId) => (dispatch) => {
    axios
        .delete(`/wishlist/${wishId}`)
        .then((wish)=>{
            dispatch({
                type: DELETE_WISH,
                payload: wish,
            })
        }).catch((err) => console.log(err))
}