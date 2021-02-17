import axios from 'axios';

export const GET_PALETTE = 'GET_PALETTE';
export const ALL_PALETTES = 'ALL_PALETTES';
export const ADD_PALETTE = 'ADD_PALETTE';
export const UPDATE_PALETTE = 'UPDATE_PALETTE';
export const REMOVE_PALETTE = 'REMOVE_PALETTE';
export const CHANGE_PALETTE = 'CHANGE_PALETTE';
export const FILTER_PALETTE = 'FILTER_PALETTE';

export const getPalette = userId => dispatch => {
    axios.get(`/palette/active/${userId}`)
        .then(res => {
            res.data ?  dispatch({type: GET_PALETTE, payload: res.data }) :
                        dispatch({type: GET_PALETTE, payload: {} })} )
}

export const getAllPalettes = () => dispatch => {
    axios.get('/palette/list').then(res => {
        dispatch({type: ALL_PALETTES, payload: res.data})
    })
}

export const addPalette = palette => dispatch => {
    axios.post('/palette/add', palette)
        .then(res => dispatch({type: ADD_PALETTE, payload: res.data}) )
}

export const updatePalette = editedPalette => dispatch => {
    axios.put(`/palette/edit/${editedPalette.id}`, editedPalette)
        .then(() => dispatch({type: UPDATE_PALETTE, payload: editedPalette}) )
}

export const removePalette = palette => dispatch => {
    axios.delete(`/palette/delete/${palette.id}`)
        .then(() => dispatch({type: REMOVE_PALETTE, payload: palette}))
}

export const changePalette = palette => dispatch => {
    const userId = localStorage.getItem('userId');
    if(userId){
        axios.put(`/palette/user/${palette.id}/${userId}`)
    }
    dispatch({type:CHANGE_PALETTE, payload: palette})
}

export const filterPalette = string => {
    return {type: FILTER_PALETTE, payload: string}
}