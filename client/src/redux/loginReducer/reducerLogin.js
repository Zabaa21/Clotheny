import {SET_USER, LOG_OUT_USER} from './actionLogin.js'


const initialState = {
    user: {},
    isLogged: false
  }

  export default (state = initialState, action) => {
    if (action.type === SET_USER) {
          return {
              ...state,
              user: {
                  email: action.payload.email,
                  id: action.payload.id,
                  role: action.payload.role,
                },
                isLogged:  true,
          };
      }
    if (action.type === LOG_OUT_USER) {
      return {
        ...state,
        user: {},
        isLogged:  false
      }
    }
    return state;
  }