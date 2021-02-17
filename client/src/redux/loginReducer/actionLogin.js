import { initializateApp } from '../../services/initializateApp'

export const SET_USER = 'SET_USER';
export const LOG_OUT_USER = 'LOG_OUT_USER';

export function setUser(user) {
    return async dispatch => {
        dispatch({
            type: SET_USER,
            payload: user,
        })
        localStorage.setItem('userId', user.id)        
        initializateApp(user.id, dispatch)
    }
}

export function logOutUser(){
  return dispatch => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    dispatch({
      type: LOG_OUT_USER
    })
  }
}

