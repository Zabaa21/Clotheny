import axios from "axios"
export const GET_OUTSTANDING = 'GET_OUTSTANDING';

export const getOutstanding = () => (dispatch) => {
    axios
      .get(`/products/get/outstanding`)
      .then((outstanding) => {
        dispatch({
          type: GET_OUTSTANDING,
          payload: outstanding,
        });
      })
      .catch((err) => console.log(err));
}