import { GET_PALETTE, ALL_PALETTES, ADD_PALETTE, UPDATE_PALETTE, REMOVE_PALETTE, CHANGE_PALETTE, FILTER_PALETTE } from './actionPalette'

const initialState = {
    loadingColors: false,
    allPalettes:[],
    filterPalettes: [],
    palette: {
        status: 'active',
        name: "default",
        type: 'light',
        primaryMain: '#F4E6E3',
        primaryDarker: '#aaa19e',
        secondaryMain: '#C9002D',
        secondaryDarker: '#932020',
        background: '',
    }
  }
  

export default (state = initialState, action) => {
    switch(action.type){
        case GET_PALETTE: {
            if(action.payload.hasOwnProperty("name")){
                const {name, type, status, primaryMain, primaryDarker, secondaryMain, secondaryDarker, background} = action.payload
                return {
                    ...state,
                    palette: {
                        status,
                        name,
                        type,
                        primaryMain,
                        primaryDarker,
                        secondaryMain,
                        secondaryDarker,
                        background,
                    }
                }
            } else { 
                return state 
            }
        }
        case ALL_PALETTES:{
            return{
                ...state,
                allPalettes: action.payload,
                filterPalettes: action.payload
            }
        }
        case ADD_PALETTE: {
            return {
                ...state,
                allPalettes: state.allPalettes.concat(action.payload),
                filterPalettes: state.allPalettes.concat(action.payload)
            }
        }
        case UPDATE_PALETTE: {
            for (let item of state.allPalettes){
                if (item.id === action.payload.id){
                    item.name = action.payload.name
                    item.status = action.payload.status
                    item.type = action.payload.type
                    item.primaryMain = action.payload.primaryMain
                    item.primaryDarker = action.payload.primaryDarker
                    item.secondaryMain = action.payload.secondaryMain
                    item.secondaryDarker = action.payload.secondaryDarker
                    item.background = action.payload.background
                }
            }
            return {
            ...state,
            allPalettes: state.allPalettes
            }
        }
        case REMOVE_PALETTE: {
            return {
                ...state,
                allPalettes: state.allPalettes.filter(item => item.id !== action.payload.id),
                filterPalettes: state.allPalettes.filter(item => item.id !== action.payload.id)
            }
        }
        case CHANGE_PALETTE: {
            if(action.payload.name){
                const {status, name, type, primaryMain, primaryDarker, secondaryMain, secondaryDarker, background} = action.payload
                return {
                    ...state,
                    palette: {
                        status,
                        name,
                        type,
                        primaryMain,
                        primaryDarker,
                        secondaryMain,
                        secondaryDarker,
                        background,
                    }
                }
            } else { 
                return state 
            }
        }
        case FILTER_PALETTE: {
            return {
                ...state,
                filterPalettes: state.allPalettes.filter(({name}) => name.toLowerCase().includes(action.payload.toLowerCase()))
            }
        }
        default: return state
    }
}